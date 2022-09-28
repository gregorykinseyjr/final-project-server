const express = require("express");
const app = express();
const env = require("dotenv");
const cors = require("cors");

//ENVIRONMENT VARIABLE/CONSTANTS
env.config();

//MONGODB CONNECTION
require("./db/conn");

const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server is running')
});

app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


