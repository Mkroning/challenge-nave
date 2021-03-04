import { connection } from '../Database/connection';

export const getProject = async (id, userId) => {
  const project = await connection('projects')
    .where({ id })
    .where({ user_id: userId })
    .select('id', 'name')
    .first();
  if (!project) {
    throw new Error();
  }

  return project;
};

export const getNaverProjectInf = async (id, userId) => {
  const navers = await connection('navers')
    .innerJoin('project_naver', 'navers.id', 'project_naver.naver_id')
    .innerJoin('projects', 'projects.id', 'project_naver.project_id')
    .where('project_naver.project_id', id)
    .andWhere('projects.user_id', userId)
    .select('navers.*');

  return navers;
};

export const projectExists = async (id) => {
  const project = await connection('projects')
    .where({ id })
    .select('user_id')
    .first();

  return project;
};

export const delProjectById = async (id) => {
  const destroyProject = await connection('projects').where({ id }).delete();

  return destroyProject;
};

export const delProjectNaverById = async (id) => {
  const destroyProject = await connection('project_naver')
    .where({ project_id: id })
    .delete();

  return destroyProject;
};

export const projectFilter = async (userId, name) => {
  const filteredProject = await connection('projects')
    .select('id', 'name')
    .where({ user_id: userId })
    .where((qb) => {
      if (name) {
        qb.where('name', 'like', `%${name}%`);
      }
    });

  return filteredProject;
};

export const getUpdatedProject = async (userId, id, name) => {
  const updatedProject = await connection('projects')
    .where({ user_id: userId })
    .andWhere({ id })
    .update({
      name,
    });

  return updatedProject;
};
