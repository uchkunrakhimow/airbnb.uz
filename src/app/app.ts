import type { Application, NextFunction, Request, Response } from 'express';
import express, { json, urlencoded } from 'express';
import routes from './routes';
import {
  sendBadRequestResponse,
  sendErrorResponse,
  sendNotFoundResponse,
} from '@helpers/responseHandler';
import { ZodError } from 'zod';

const app: Application = express();

app.use(json());
app.use(
  urlencoded({
    extended: true,
  }),
);

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome!' });
});

app.use(routes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err.message);
  if (err instanceof ZodError) {
    sendBadRequestResponse(res, err.flatten());
    return;
  }
  sendErrorResponse(res, 'Something went wrong');
});

app.use((req: Request, res: Response) => {
  sendNotFoundResponse(res, `Cannot ${req.method} ${req.path}`);
});

export default app;
