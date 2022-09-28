const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			min: 3,
			max: 20,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			min: 3,
			max: 20,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		hash_password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
	},
	{ timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
