import {connection} from './../Database/connection';
import { project } from './../Utils/validation';
import {
  getNaverProjectInf,
  getProject,
  projectExists,
  delProjectById,
  delProjectNaverById,
  projectFilter,
  getUpdatedProject,
} from './../Services/projectServices';

const projectController = {
  Store: async (req, res) => {
    const { userId } = req;

    if (!(await project.isValid(req.body))) {
      return res.status(401).json({
        ERROR: 'validations fails'
      });
    }

    const { name, navers } = req.body;

    const insertedId = await connection('projects')
      .insert({
        name,
        user_id: userId,
      })
      .returning('id');

    if (!navers) {
      return res.json({ name });
    }

    const projectNaver = navers.map((naverId) => {
      return {
        naver_id: naverId,
        project_id: insertedId[0],
      };
    });

    await connection('project_naver').insert(projectNaver);

    return res.json({
      name,
      navers,
    });
  },

  Index: async (req, res) => {
    const { userId } = req;
    const { name } = req.query;

    try {
      const projects = await projectFilter(userId, name);

      return res.json(projects);
    } catch (error) {
      return res.json({ error });
    }
  },

  Show: async (req, res) => {
    const { id } = req.params;
    const { userId } = req;

    try {
      const project = await getProject(id, userId);

      const navers = await getNaverProjectInf(id, userId);

      return res.json({ ...project, navers });
    } catch (error) {
      return res.status(404).json({
        error: 'Project not found!'
      });
    }
  },

  Delete: async (req, res) => {
    const { id } = req.params;
    const { userId } = req;

    try {
      const project = await projectExists(id);

      if (!project) {
        return res.status(404).json({
          error: 'Project not found'
        });
      }

      if (project.user_id !== userId) {
        return res
          .status(401)
          .json({
            error: 'Operation not  permitted.'
          });
      }

      await delProjectById(id);

      return res.status(204).send();
    } catch (error) {
      return res.status(401).json({ error });
    }
  },
  Update: async (req, res) => {
    const { userId } = req;
    const { id } = req.params;

    const { name, navers } = req.body;

    if (!(await project.isValid(req.body))) {
      return res.status(401).json({
        ERROR: 'validations fail'
      });
    }
    try {
      const updatedProject = await getUpdatedProject(userId, id, name);

      if (!updatedProject) {
        return res.status(400).json({
          ERROR: 'UPDATE ERROR'
        });
      }

      const projectNaver = navers.map((naverId) => {
        return {
          naver_id: naverId,
          project_id: id,
        };
      });

      await delProjectNaverById(id);
      await connection('project_naver').insert(projectNaver);
      return res.json({
        name,
        navers,
      });
    } catch (error) {
      return res.json({ error });
    }
  },
};

export default projectController;
