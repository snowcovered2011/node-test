'use strict';

import time from 'time-formater';
import BaseComponent from '../prototype/baseComponent.js';
import StatisModel from '../models/statis/statis';

class Statistic extends BaseComponent {
	constructor(props) {
		super(props);
		this.apiRecord = this.apiRecord.bind(this);
	}
	async apiRecord (req, res, next) {
		try {
			const statis_id = await this.getId('statis_id');
			// 根据模型定的值
			const apiInfo = {
				date: time().format('YYYY-MM-DD'),
				origin: req.headers.origin,
				id: statis_id,
			}
			// 新增
			statisModel.create(apiInfo);
		} catch (err) {
			console.log('API记录出错', err);
		}
		next();
	}
}

export default new Statistic()
