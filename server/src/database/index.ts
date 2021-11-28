import { createConnection } from "typeorm";

createConnection("default")
    .then(() => {
        console.log("Connected to the database")
        import("../server")
    })
    .catch(() => console.log("Unable to connect to the database"));