import express from 'express';
import sequelize from './database.js';
import User from './models/userModel.js';
import Course from './models/CourseModel.js';
import Lesson from './models/LessonModel.js';
import Assignment from './models/AssignmentModel.js';
import authRoutes from './routers/authRoute.js';
import userRouter from './routers/userRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import dotenv from 'dotenv';
import courseRouter from './routers/courseRouter.js';
import lessonRouter from './routers/lessonRouter.js';
import assignmentRouter from './routers/assignmentRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, your server is running!');
});

app.use('/api', userRouter);
app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadRouter);
app.use('/courses', courseRouter); //  Prefixed with /api
app.use('/api/lessons', lessonRouter); // Prfxd with /api
app.use('/api/assignments', assignmentRouter); // Prfxd with /api

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await User.sync();
        await Course.sync();
        await Lesson.sync();
        await Assignment.sync();
        //sync all models
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
