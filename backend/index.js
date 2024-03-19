const express = require('express');
const mainRouter = require("./routes/index");
const bodyParser = require('body-parser');
const cors = express();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", mainRouter);


app.listen(3000, () => {
    console.log("");
})