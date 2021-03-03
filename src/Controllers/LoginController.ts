import JWT from 'jsonwebtoken'
import authConfig from './../Config/auth'
import {
  getUser
} from './../Services/loginServices'
import {
  verifyPassword
} from './../Services/userServices'

const loginController = {
  Store: async (request, response) =>{
    const user = await getUser(email);
    if (!user) {
      return response.status(401).json({
        message: 'Incorrect Email or Password. Try again!'
      });
    }

    if(!verifyPassword(PASSWORD, user.password)){
      return response.status(401).json({
        message: 'Incorrect Email or Password. Try again!'
      })
    }

    const { id, name } = user;

    return response.json({
      user: {
        id,
        name,
        email,
      },
      token: JWT.sign({id}, authConfig.secret {
        expiresIn: authConfig.expiresIn
      }),
    });
  },
}

export default loginController

