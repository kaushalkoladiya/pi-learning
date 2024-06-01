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

        // Check if database exists
        const resDb = await masterClient.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}';`);
        if (resDb.rowCount === 0) {
            // Create a new database if not exists
            await masterClient.query(`CREATE DATABASE ${dbName};`);
            console.log(`Database ${dbName} created successfully.`);
        } else {
            console.log(`Database ${dbName} already exists.`);
        }

        // Check if user exists
        const resUser = await masterClient.query(`SELECT 1 FROM pg_roles WHERE rolname='${dbUser}';`);
        if (resUser.rowCount === 0) {
            // Create a new user with encrypted password if not exists
            await masterClient.query(`CREATE USER ${dbUser} WITH ENCRYPTED PASSWORD '${dbUserPassword}';`);
            console.log(`User ${dbUser} created successfully.`);
        } else {
            console.log(`User ${dbUser} already exists.`);
        }

        // Grant all privileges on the new database to the new user
        await masterClient.query(`GRANT ALL PRIVILEGES ON DATABASE ${dbName} TO ${dbUser};`);
        console.log(`Privileges granted to user ${dbUser} on database ${dbName}.`);

    } catch (error) {
        console.error('Failed to perform database operations:', error);
    } finally {
        await masterClient.end();
    }
}
