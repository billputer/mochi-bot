/**
 *  @module			config
 *  @description	Config for Mochi-Bot (domo-kun IRC chatbot)
 *
 *  @author			cemckinley <cemckinley@gmail.com>
 */

module.exports = (function(){

	var config = {
		nick: 'Mochi',
		userName: 'Mochi',
		realName: 'Mochi the IRC Bot',
		address: 'chat.freenode.net',
		channels: ['#hillpeople'],
		users: [],
		debug: true
	};

	return config;

});