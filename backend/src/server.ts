import express from 'express';
import cors from 'cors';
import analyzeRoute from './routes/analyzeRoute';
import simulateRoute from './routes/simulateRoute';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', analyzeRoute);
app.use('/api', simulateRoute);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});