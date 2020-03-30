const express = require("express");
const mongoose = require("mongoose");
const app = express();
const uri = require("./config/keys").mongoURI;
const router = require("./router");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

mongoose
	.connect(uri)
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.log(err));

const port = process.env.PORT || 4000;
app.use("/", router);

app.listen(port, () => console.log("app listen on port"));
