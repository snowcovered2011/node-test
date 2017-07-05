'use strict';

class Statistic extends BaseComponent {
	constructor(props) {
		super(props);
		this.apiRecord();
	}
	async apiRecord (req, res, next) {
		try {

		} catch (err) {
			console.log('API记录出错', err);
		}
		next();
	}
}

export default new Statistic()
