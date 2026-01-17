import express from 'express';
import cors from 'cors';
import { connectDb } from './configs/connectDb.js';
import { configDotenv } from 'dotenv';
configDotenv();

// Importing routes
import taskRoutes from './routes/task.routes.js';
import boardRoutes from './routes/board.routes.js';

const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/boards', boardRoutes);




app.get('/', (req, res) => {
    res.send('server working');
});




const PORT = process.env.PORT || 5000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database", error);
});
