const mongoose = require("mongoose");

const DB = process.env.DATABASE;

console.log('db url ===', DB)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log("Database not connected", err));
