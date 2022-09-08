import StatusCodes from 'http-status-codes';
import { Router, Request, Response } from 'express';
import {task,Prioritys} from '../../models/task-model';

const router = Router();
const { OK } = StatusCodes;

export const p = {
    tasks: '/',
} as const;


router.get(p.tasks, (req: Request, res: Response) => {
    const tasks:task[]=[
        { id:1,name : "test1", priority : Prioritys.REGULAR},
        { id:2,name : "test2", priority : Prioritys.URGENT},
        { id:3,name : "test3", priority : Prioritys.TRIVIAL}
    ];
    return res.status(OK).send(tasks);
});


export default router;
