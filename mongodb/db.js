'use strict';

import mongoose from 'mongoose';
import config from 'config-lite';

// 连接数据库
mongoose.connect(config.url, {server: {auto_reconnect: true}});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
	console.log('连接数据库成功')
});

db.on('error', (error) => {
	console.log('Error in MongoDb connection:' + error);
	mongoose.disconnect();
});

db.on('close', () => {
	console.log('数据库连接已断开，正在重新连接数据库');
	mongoose.connect(config.url, {server: {auto_reconnect: true}})
});

export default db;