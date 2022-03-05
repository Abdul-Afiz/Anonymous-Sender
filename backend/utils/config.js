require("dotenv").config();

const mongoUrl = process.env.URI;
const port = process.env.port || 5000;

module.exports = { mongoUrl, port };
