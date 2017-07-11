'use strict';

import userModel from '../models/users.js';

class UserInfo {
	constructor (props) {

	}
	// 增
	async saveData (req, res, next) {
		let userData = new userModel({
			name: 'yanlihui',
			age: 27,
			hobit: 'IT',
			describe: 'love u everyday'
		});
		await userData.save((err, docs) => {
			if (err) {
				res.send({
					code: '888888',
					message: '系统错误'
				});
			} else {
				res.send({
					data: docs,
					code: '000000',
					message: '成功'
				});
			}
		});
	}
	// 查
	async findData (req, res, next) {
		await userModel.find({}, (err, docs) => {
			if (err) {
				res.send({
					code: '888888',
					message: '系统错误'
				});
			} else {
				res.send({
					data: docs,
					code: '000000',
					message: '成功'
				});
			}
		});
	}
	// 改
	async updateData (req, res, next) {
		await userModel.update({name: 'yanlihui'}, {name: 'xh'}, (err, docs) => {
			if (err) {
				res.send({
					code: '888888',
					message: '系统错误'
				});
			} else {
				res.send({
					data: docs,
					code: '000000',
					message: '成功'
				});
			}
		});
	}
	// 删
	async removeData (req, res, next) {
		await userModel.remove({name: 'yanlihui'}, (err, docs) => {
			if (err) {
				res.send({
					code: '888888',
					message: '系统错误'
				});
			} else {
				res.send({
					data: docs,
					code: '000000',
					message: '成功'
				});
			}
		});
	}
}

export default new UserInfo()