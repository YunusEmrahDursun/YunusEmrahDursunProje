import express, { Request, Response } from "express";
import next from "next";
import apiRouter from "./routers/api";
const app = next({ dev:true });
const handle = app.getRequestHandler();
const port = 3000;
const server = express();


async function main() {
  try {
    await app.prepare();

    server.use('/api', apiRouter);

    server.use("/", (req: Request, res: Response) => {
      return handle(req, res);
    });
    

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready react on localhost:${port}`);
    });

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
