const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handling Uncaught Exception (using a variable which is not defined)
process.on("uncaughtException", (err) => {
    console.log(`Error ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})

// config
dotenv.config({ path: "./config/config.env" });
const port = process.env.PORT || 3005;

// Connect Database
connectDatabase();


const server = app.listen(port, () => {
    console.log();
    console.log(`Server is running on port ${port}`);
})


// Unhandled promise rejection (eg :- mongo instead of mongodb)
// in these cases we have to crash our own server asap

process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    })
})