import { connection } from './../Database/connection'
import { user } from './../Utils/validation'
import { generatePasswordHashed } from './../Services/userServices'

const userController = {
  Store: async (req, res) => {
    if(!(await user.isValid(req.body))) {
      return res.status(401).json({
        ERROR:' Validation fail'
      });
    }
    const {
      name,
      email,
      password
    } = req.body;

    const passwordHashed = generatePasswordHashed(password);
    const userExist = await connection('users').where({email}).first();

    if (userExist) {
      return res.status(401).json({
        ERROR: ']User already registered'
      });
    }

    await connection('users').insert({
      name,
      email,
      password: passwordHashed
    });

    return res.json({
      name,
      email,
      passwordHashed
    });
  }
}

export default userController;
