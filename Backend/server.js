import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectDb } from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import { errorMiddleware } from './middlewares/error.js';

dotenv.config({
    path: './.env'
})
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to social post')
})

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)


app.use(errorMiddleware)

connectDb().then(() => {
    app.listen(PORT, () => console.log('Server running'))
})