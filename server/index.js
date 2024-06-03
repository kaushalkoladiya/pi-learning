import express from 'express';
import sequelize from './database.js';
import userRouter from './routers/userRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', userRouter);
app.use('/api/uploads', uploadRouter);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Attempt to sync all models
        await sequelize.sync({ force: false });
        console.log('Database synced.');

        // Start the server
        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the application:', error);
        process.exit(1); // Exit the process with an error code
    }
}

startServer();
