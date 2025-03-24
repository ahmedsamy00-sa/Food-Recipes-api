const sql = require("mssql");
require('dotenv').config();

const config = {
    user: "ahmed",
    password: "ahmed123",
    server: "DESKTOP-7OQB0J9",
    database: "trail",
    options: {  
        trustedConnection: false,
        enableArithAbort: true,
        encrypt: true,  // 
        trustServerCertificate: true,  
        cryptoCredentialsDetails: {
            minVersion: "TLSv1.2" 
        }
    },
    port: 1433,
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log("Database connected!");
    } catch (err) {
        console.log("Database Connection Error:", err);
    }
};

module.exports = { connectDB, sql };