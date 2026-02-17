import express from "express";
import routes from './routes';
import cors from 'cors';
import errorMiddleware from './shared/middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.use(errorMiddleware);

export default app;