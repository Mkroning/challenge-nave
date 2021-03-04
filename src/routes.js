import { Router } from 'express';
import userController from './Controllers/UserController';
import loginController from './Controllers/LoginController';
import naverController from './Controllers/NaveController';
import projectController from './Controllers/ProjectController';
import authMidleware from './Middlewares/Authentication';
const routes = Router();

routes.post('/signup', userController.Store);
routes.post('/login', loginController.Store);

routes.use(authMidleware);

routes.get('/navers', naverController.Index);
routes.post('/navers', naverController.Store);
routes.get('/navers/:id', naverController.Show);
routes.delete('/navers/:id', naverController.Delete);
routes.put('/navers/:id', naverController.Update);

routes.get('/projects', projectController.Index);
routes.post('/projects', projectController.Store);
routes.get('/projects/:id', projectController.Show);
routes.delete('/projects/:id', projectController.Delete);
routes.put('/projects/:id', projectController.Update);

export default routes
