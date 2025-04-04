import express from 'express';
import bookingRoutes from './Routes/bookingRoutes.js'
import { connectDB } from './Config/db.js';

const app = express();
app.use(express.json());
connectDB()
const PORT = 8000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/booking', bookingRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});