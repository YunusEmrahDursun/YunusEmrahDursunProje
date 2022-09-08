import { Router } from 'express';

import task from './task-router';

const apiRouter = Router();

apiRouter.use('/tasks',  task)

export default apiRouter;
