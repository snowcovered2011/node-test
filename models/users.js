'use strict';

import mongoose from 'mongoose';

const userInfo = new mongoose.Schema({
	name: String,
	age: Number,
	hobit: String,
	describe: String
});

const UserInfo = mongoose.model('UserInfo', userInfo);


export default UserInfo