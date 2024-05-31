// index.js
import express from 'express';
import { setupDatabase } from './database.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, your server is running!');
});

async function startServer() {
    try {
        console.log("Initializing database setup...");
        await setupDatabase();  // Setup database and user
        console.log("Database setup completed successfully.");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the application:", error);
    }
}

startServer();
