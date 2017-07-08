// 基础组件，其他从基础组件继承

import fetch from 'node-fetch';// 接口请求
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
	}
}