// 基础组件，其他从基础组件继承

import fetch from 'node-fetch';// 接口请求
import Ids from '../models/ids';
import formidable from 'formidable'; // 表单模块
import path from 'path';
import fs from 'fs';
import qiniu from 'qiniu';
qiniu.conf.ACCESS_KEY = 'AKqioS8MOJ40zHYwtNChj5mNB952K_-UNOPf1t5C';
qiniu.conf.SECRET_KEY = 'Pl69XcBBWFtJJaiCklvGr0KABhzGv4MB6AhMLA35';

export default class BaseComponent {
	constructor () {
		this.idList = ['restaurant_id', 'food_id', 'order_id', 'user_id', 'address_id', 'cart_id', 'img_id', 'category_id', 'item_id', 'sku_id', 'admin_id', 'statis_id'];
		this.imgTypeList = ['shop', 'food', 'avatar','default'];
		this.uploadImg = this.uploadImg.bind(this)
		this.qiniu = this.qiniu.bind(this)
	}
	// 接口请求封装
	async fetch (url = '', data = {}, type = 'GET', resType = 'JSON') {
		type = type.toUpperCase();
		resType = resType.toUpperCase();
		if (type === 'GET') {
			let dataStr = ''; //数据拼接字符串
			Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&';
			});
			if (dataStr !== '') {
				dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
				url = url + '?' + dataStr; // 将请求参数拼接在url里
			}
		}
		let requestConfig = {
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}
		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		let responseJson;
		try {
			const response = await fetch(url, requestConfig);
			if (resType === 'TEXT') {
				responseJson = await response.test();
			} else {
				responseJson = await response.json();
			}
		} catch (err) {
			console.log('获取数据失败', err);
			throw new Error(err);
		}
		return responseJson;
	}
	async getId (type) {
		if (!this.idList.includes(type)) {
			console.log('id类型错误');
			throw new Error('id类型错误');
			return
		}
		try {
			const idData = await Ids.findOne();
			idData[type]++;
			// 保存起来
			await idData.save();
			return idData[type];
		} catch (err) {
			console.log('获取ID数据失败');
			throw new Error(err);
		}
	}
	async uploadImg (req, res, next) {
		// 获取请求里面图片类型
		const type = req.params.type;
		try {
			const image_path = await this.qiniu(req, type);
			res.send({
				status: 1,
				image_path,
			});
		} catch (err) {
			console.log('上传图片失败', err);
			res.send({
				status: 0,
				type: 'ERROR_UPLOAD_IMG',
				message: '上传图片失败',
			})
		}
	}
	async qiniu (req, type = 'default') {
		return new Promise((resolve, reject) => {
			const form = formidable.IncomingForm();
			form.uploadDir = './public/img/' + type;
			// form表单解析
			form.parse(req, async (err, fields, files) => {
				let img_id;
				try{
					img_id = await this.getId('img_id');
				} catch (err) {
					console.log('获取图片id失败');
					// 删除文件操作
					fs.unlink(files.file.path);
					reject('获取图片id失败');
				}
				const imgName = (new Date().getTime() + Math.ceil(Math.random()*10000)).toString(16) + img_id;
				const extname = path.extname(files.file.name);
				const repath = './public/img/' + type + '/' + imgName + extname;
				
			})
		})
	}
}