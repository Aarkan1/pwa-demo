import sqlite from "better-sqlite3";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const conn = sqlite(join(__dirname, "superheroes.db"));

// db helper methods
const db = {
    all(query, params = {}) {
        const stmt = conn.prepare(query);
        return stmt.all(params);
    },
    run(query, params = {}) {
        const stmt = conn.prepare(query);
        return stmt.run(params);
    },
};

export const getHeroes = (page = 0, limit = 30) => {
    const results = db.all(`SELECT * FROM heroes LIMIT :page, :limit`, {
        page: page * limit,
        limit,
    });

    return results;
};

export const getHeroById = (id) => {
    const results = db.all(`SELECT * FROM heroes WHERE id = :id`, { id });

    return results[0];
};

export const searchHeroByName = (name) => {
    const results = db.all(`SELECT * FROM heroes WHERE name LIKE :name`, {
        name: `%${name}%`,
    });

    return results;
};
