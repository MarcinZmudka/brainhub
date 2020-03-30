const express = require("express");
const router = express.Router();
const dataSchema = require("./models/dataSchema");
const cors = require("cors");

router.use(cors());
router.post("/", (req, res) => {
	const newData = new dataSchema({
		...req.body.body
	});
	newData
		.save()
		.then(item => res.json(item))
		.catch(err => res.json({
			error: "error"
		}));
});

module.exports = router;
