import { connection } from './../Database/connection'
import { naver } from './../Utils/validation'
import {
  getNaver,
  getProjectNaverInf,
  naverExists,
  delNaverById,
  delProjectNaverById,
  naverFilter,
  getUpdatedNaver
} from './../Services/naverServices'

const naverController = {
  Store: async (req, res) => {
    const { userId } = req;

    if (!(await naver.isValid(req.body))) {
      return res.status(401).json({
        ERROR: 'validations fail'
      });
    }

    const { name, birthdate, admissionDate, jobRole, projects } = req.body;
    const data = {
      name,
      birthdate,
      admissionDate,
      jobRole,
      user_id: userId,
    };

    const insertedId = await connection('navers').insert(data).returning('id');

    if (!projects) {
      return res.json(data);
    }

    const projectNaver = projects.map((projectId) => {
      return {
        naver_id: insertedId[0],
        project_id: projectId,
      };
    });

    await connection('project_naver').insert(projectNaver);

    return res.json({ ...data, projects });
  },

  Show: async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    try {
      const naver = await getNaver(id, userId);

      if (!naver) {
        return res.status(404).json({
          Message: 'Naver not found!'
        });
      }
      const projects = await getProjectNaverInf(id, userId);

      return res.json({ ...naver, projects });
    } catch (error) {
      return res.json({ error });
    }
  },

  Index: async (req, res) => {
    const { name, admissionDate, jobRole } = req.query;
    const { userId } = req;

    try {
      const navers = await naverFilter(userId, name, admissionDate, jobRole);

      return res.json(navers);
    } catch (error) {
      return res.json({ error });
    }
  },

  Delete: async (req, res) => {
    const { id } = req.params;
    const { userId } = req;

    try {
      const naver = await naverExists(id);

      if (!naver) {
        return res.status(404).json({
          Message: 'naver not found!'
        });
      }

      if (naver.user_id !== userId) {
        return res
          .status(401)
          .json({
              Message: 'Operation not permitted!'
          });
      }

      await delNaverById(id);

      return res.status(204).send();
    } catch (error) {
      return res.status(401).json({ error });
    }
  },

  Update: async (req, res) => {
    const { userId } = req;
    const { id } = req.params;

    const { name, birthdate, admissionDate, jobRole, projects } = req.body;

    if (!(await naver.isValid(req.body))) {
      return res.status(401).json({
        ERROR: 'validations fail'
      });
    }
    const navers = { name, birthdate, admissionDate, jobRole };

    try {
      const updatedNaver = await getUpdatedNaver(
        userId,
        id,
        name,
        birthdate,
        admissionDate,
        jobRole
      );
      if (!updatedNaver) {
        return res.status(400).json({
          ERROR: 'UPDATE ERROR'
        });
      }

      const projectNaver = projects.map((projectId) => {
        return {
          naver_id: id,
          project_id: projectId,
        };
      });

      await delProjectNaverById(id);
      await connection('project_naver').insert(projectNaver);

      return res.json({
        ...navers,
        projects,
      });
    } catch (error) {
      return res.status(401).json({
        error: 'update Error'
      });
    }
  },
}
export default naverController
