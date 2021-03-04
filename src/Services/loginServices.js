import { connection } from './../Database/connection'

export const getUser = async(email) => {
  const user = await connection('users')
  .where({email})
  .select('users.*')
  .first();

  return user;
}
