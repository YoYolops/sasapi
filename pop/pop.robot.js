import connection from "../src/database/connection.js";
import "../src/setup.js";

console.log("creating products...")
await connection.query(`INSERT INTO products (name) VALUES ($1)`, [ "Incensos" ])
await connection.query(`INSERT INTO products (name) VALUES ($1)`, [ "Chás" ])
await connection.query(`INSERT INTO products (name) VALUES ($1)`, [ "Produtos orgânicos" ])

console.log("creating plans...")
await connection.query(`INSERT INTO plans (type) VALUES ($1)`, [ "s" ])
await connection.query(`INSERT INTO plans (type) VALUES ($1)`, [ "m" ])

console.log("Closing connection")
await connection.end()
console.log("Done!")