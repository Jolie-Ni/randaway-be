import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


// connect to aws dynamoDB and display a list of db entries
app.get('/locations', (req: Request, res: Response) => {
    res.send('this endpoint will return a list of locations parsed from instagram posts');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
