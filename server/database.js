// database.js
import pg from 'pg';
const { Client } = pg;

// Database and user details
const dbName = "newdb";
const dbUser = "newuser";
const dbUserPassword = "123456";

export async function setupDatabase() {
    const masterClient = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: '123456',  // Update with your actual password
        port: 5432,
    });

    try {
        await masterClient.connect();
        console.log("Connected to the PostgreSQL server successfully.");

        // Create a new database
        await masterClient.query(`CREATE DATABASE ${dbName};`);
        console.log(`Database ${dbName} created successfully.`);

        // Create a new user with encrypted password
        await masterClient.query(`CREATE USER ${dbUser} WITH ENCRYPTED PASSWORD '${dbUserPassword}';`);
        console.log(`User ${dbUser} created successfully.`);

        // Grant all privileges on the new database to the new user
        await masterClient.query(`GRANT ALL PRIVILEGES ON DATABASE ${dbName} TO ${dbUser};`);
        console.log(`Privileges granted to user ${dbUser} on database ${dbName}.`);

    } catch (error) {
        console.error('Failed to perform database operations:', error);
    } finally {
        await masterClient.end();
    }
}
