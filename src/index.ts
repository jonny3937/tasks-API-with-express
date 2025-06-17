import express, { Request, Response } from 'express';
import tasksRouters from "./routes/route.routes";


const app = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to API Test in TS and Express');
});


app.use("/tasks", tasksRouters)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
