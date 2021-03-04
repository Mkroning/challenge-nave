import bcrypt from 'bcrypt';

const salt = 8;
const saltKeys = 'sylpher';

export const generatePasswordHashed = (password) => {
  const pass = bcrypt.hashSync(`${password}${saltKeys}`, salt);

  return pass;
};

export const verifyPassword = (passwordToCompare, password) => {
  const isValid = bcrypt.compareSync(
    `${passwordToCompare}${saltKeys}`,
    password
  );

  return isValid;
};
