import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import sequelize from './database.js';
import User from './models/userModel.js';
import UserAddress from './models/UserAddressModel.js'; 
import Department from './models/DepartmentModel.js'; 
import associateModels from './models/config/associateModels.js';
import authRoutes from './routers/authRoutes.js';
import userRouter from './routers/userRouter.js';
import Course from './models/CourseModel.js';
import Lesson from './models/LessonModel.js';
import Assignment from './models/AssignmentModel.js';
import uploadRouter from './routers/uploadRouter.js';
import departmentRouter from './routers/departmentRouter.js';
import countryRouter from './routers/countryRouter.js';
import provinceRouter from './routers/provinceRouter.js';
import courseRouter from './routers/courseRouter.js';
import lessonRouter from './routers/lessonRouter.js';
import assignmentRouter from './routers/assignmentRouter.js';
import generateSecretKey from './utils/jwtsecretkey.js';
import tokenRoute from './routers/tokenRoute.js';

// Setup __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, your server is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/token', tokenRoute);
// Apply middleware to protected routes
app.use('/api',userRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/provinces', provinceRouter);
app.use('/api/countries', countryRouter);
app.use('/api/uploads', uploadRouter);
app.use('/courses', courseRouter);
app.use('/api/lessons', lessonRouter);
app.use('/api/assignments', assignmentRouter);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Define associations
        associateModels();

        // Sync only specific models
        await Department.sync({ force: false });
        await User.sync({ force: false });
        await UserAddress.sync({ force: false });
        await Course.sync();
        await Lesson.sync();
        await Assignment.sync();
        await sequelize.sync({ force: false });
        console.log('Database synced.');
        

        // Generate secret key if not exists
        generateSecretKey();

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
