import db from "../../models";
import bcrypt from "bcrypt";
import {
	validationResult
} from "express-validator";

export default class UsersController {
	static async getData(req, res) {
		const username = req.query.username;
		var condition = username ?
			{
				username: {
					$regex: new RegExp(username),
					$options: "i",
				},
			} :
			{};

		db.users
			.find(condition)
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || "Some error occurred while retrieving tutorials.",
				});
			});
	}

	static async getOneData(req, res) {
		let id = req.params.id;

		db.users
			.findById(id)
			.then((data) => {
				if (!data)
					res.status(404).send({
						message: "Not found Tutorial with id " + id,
					});
				else res.send(data);
			})
			.catch((err) => {
				res.status(404).send({
					message: err.message || "Some error occurred while retrieving tutorials.",
				});
			});
	}

	static async store(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				errors: errors.array(),
			});
		}

		let username = req.body.username;
		let password = req.body.password;
		let name = req.body.name ? req.body.name : "";
		let nik = req.body.nik ? req.body.nik : "";

		const users = new db.users({
			username: username,
			password: bcrypt.hashSync(password, 10),
			profil: {
				name: name,
				nik: nik,
			},
		});

		users
			.save(users)
			.then((data) => {
				// console.log(data);
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message,
					req: username,
				});
			});
	}

	static async update(req, res) {
		let username = req.body.username;
		let password = req.body.password;
		let id = req.params.id;

		db.users
			.findByIdAndUpdate(
				id, {
					username,
					password,
				}, {
					useFindAndModify: false,
				}
			)
			.then((data) => {
				if (!data) {
					res.status(404).send({
						message: `Cannot update Users with id=${id}. Maybe Users was not found!`,
					});
				} else
					res.send({
						message: "Users was updated successfully.",
					});
			})
			.catch((err) => {
				res.status(500).send({
					message: "Error updating Users with id=" + id,
				});
			});
	}

	static async delete(req, res) {
		let id = req.params.id;

		db.users
			.findByIdAndRemove(id)
			.then((data) => {
				if (!data) {
					res.status(404).send({
						message: `Cannot delete Users with id=${id}. Maybe Users was not found!`,
					});
				} else {
					res.send({
						message: "Users was deleted successfully!",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: "Could not delete Users with id=" + id,
				});
			});
	}

	static async deleteAll(req, res) {
		db.users
			.deleteMany({})
			.then((data) => {
				res.send({
					message: `${data.deletedCount} Users were deleted successfully!`,
				});
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || "Some error occurred while removing all Users.",
				});
			});
	}
}