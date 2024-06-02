import express from 'express';
import sequelize from './database.js';
import userRouter from './routers/userRouter.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', userRouter);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Attempt to sync all models
        await sequelize.sync({ force: false });
        console.log('Database synced.');

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the application:', error);
        process.exit(1); // Exit the process with an error code
    }
}

startServer();
