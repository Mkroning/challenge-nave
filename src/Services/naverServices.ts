import { connection } from '../Database/connection';

export const getNaver = async (id, userId) => {
  const naver = await connection('navers')
    .where({ id })
    .where({ user_id: userId })
    .select('navers.*')
    .first();

  return naver;
};

export const getProjectNaverInf = async (id, userId) => {
  const projects = await connection('navers')
    .innerJoin('project_naver', 'navers.id', 'project_naver.naver_id')
    .innerJoin('projects', 'projects.id', 'project_naver.project_id')
    .where('project_naver.naver_id', id)
    .andWhere('projects.user_id', userId)
    .select('projects.id', 'projects.name');

  return projects;
};

export const naverExists = async (id) => {
  const naver = await connection('navers')
    .where({ id })
    .select('navers.user_id')
    .first();

  return naver;
};

export const delNaverById = async (id) => {
  const destroyNaver = await connection('navers').where({ id }).delete();

  return destroyNaver;
};

export const delProjectNaverById = async (id) => {
  const destroyNaverFK = await connection('project_naver')
    .where({ naver_id: id })
    .delete();

  return destroyNaverFK;
};

export const naverFilter = async (userId, name, admissionDate, jobRole) => {
  const filteredNaver = await connection('navers')
    .where({ user_id: userId })
    .where((qb) => {
      if (name) {
        qb.orWhere('name', 'like', `%${name}%`);
      }
      if (admissionDate) {
        qb.orWhere({ admissionDate });
      }
      if (jobRole) {
        qb.orWhere('jobRole', 'like', `${jobRole}%`);
      }
    });

  return filteredNaver;
};

export const getUpdatedNaver = async (
  userId,
  id,
  name,
  birthdate,
  admissionDate,
  jobRole
) => {
  const updatedNaver = await connection('navers')
    .where({ user_id: userId })
    .andWhere({ id })
    .update({ name, birthdate, admissionDate, jobRole });
  if (!updatedNaver) {
    throw Error();
  }

  return updatedNaver;
};
