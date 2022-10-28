const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
// config
dotenv.config({path : "./config/config.env"});

// Connect Database
connectDatabase();


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.port}`);
})

// Unhandled promise rejection (eg :- mongo instead of mongodb)
// in these cases we have to crash our own server asap

process.on("unhandledRejection",err=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    })
})