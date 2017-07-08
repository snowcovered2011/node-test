'use strict';

import mongoose from 'mongoose';

const staticScheme = new mongoose.Schema({
	date: String, // 定义一个属性data，类型为String
	origin: String,
	id: Number,
});

// 建索引
staticScheme.index({id: 1});

// 将该Schema发布为Model
const Statis = mongoose.model('Statis', staticScheme);

export default Statis;