// const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://localhost:27017';

// import mongo from '../../config/mongodb'

export default class HomeController {

	static async index(req, res) {

		// await mongo.insertOne('users', {name: 'aka', level: 1})
		// let data = await mongo.find('users', {name: 'aka'});
		// console.log(data)

		let api = {
			status: false,
			data: [],
		}
		return res.send(api);
	}

	static async notFound(req, res) {

		// await mongo.insertOne('users', {name: 'aka', level: 1})
		// let data = await mongo.find('users', {name: 'aka'});
		// console.log(data)

		let api = {
			status: false,
			message: 'pages not found!',
		}
		res.status(404).send(api);
	}


}