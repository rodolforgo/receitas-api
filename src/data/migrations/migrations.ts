import { BaseDatabase } from "../BaseDatabase";

class Migrations {
    async createTable() {
        await BaseDatabase.connection.raw(`
        CREATE TABLE cookenu_users (
            id VARCHAR(255) PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
            role VARCHAR(255) DEFAULT "normal"
        );

        CREATE TABLE cookenu_recipes (
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(8000) NOT NULL,
            createdAt DATE NOT NULL,
            user_id VARCHAR(255), FOREIGN KEY (user_id) REFERENCES cookenu_users(id)
        );

        CREATE TABLE cookenu_followers (
            id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255), FOREIGN KEY (user_id) REFERENCES cookenu_users(id),
            follow_id VARCHAR(255), FOREIGN KEY (user_id) REFERENCES cookenu_users(id)
        );
     `);

        console.log("Tabelas criadas.");
        BaseDatabase.connection.destroy();
    }
}

new Migrations().createTable();