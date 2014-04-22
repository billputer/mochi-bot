/**
 *  @module			routes/basic
 *  @description	Basic routes for mochibot
 *
 *  @author			cemckinley <cemckinley@gmail.com>
 */

var http = require('http');
var twitter = require('mtwitter');
var config = require('../config');


var basicRoutes = {

	state: {
		favoriteUser: null
	},
	twitter: new twitter(config.twitter),


	initialize: function(bot){

		for( var i = 0, len = this.routes.length; i < len; i++ ){
			bot.route.call( bot, this.routes[i].match, this.routes[i].action );
		}

	},

	routes: [
		/**
		 * Spam horse_ebooks anytime someone mentions ebooks.
		 */
		{
			match: /ebooks/gi,
			action: function(res){
				var self = this,
					msg = res.message;

				getEbooks(function(ebooks){
					self.say(res.channel, ebooks);
				});
			}
		},
		// it's free software
		{
			match: /open source/gi,
			action: sayit("http://i.imgur.com/5wln1QI.gif")
		},
		// welp
		{
			match: /welp/gi,
			action: sayit("http://w-e-l-p.com/")
		},
		// horrified dog
		{
			match: /horrified|cruft|sad|bad/gi,
			action: sayit("http://i.imgur.com/SfYdUmR.jpg")
		},
		// magic
		{
			match: /magic/gi,
			action: sayit("http://i.imgur.com/xS9e0St.gif")
		},
		// lizard goes heheeh
		{
			match: /\blol\b/gi,
			action: sayit("http://i.imgur.com/AKUD3VM.jpg")
		},
		// llamma derp
		{
			match: /\bderp\b/gi,
			action: sayit("http://i.imgur.com/37NgSbx.gif")
		}
	],
};

function sayit(text){
	return function(res){
		var self = this;
		self.say(res.channel, text);
	};
}

function getCatGif(callback){
	var httpOpts = {
			host: "thecatapi.com",
			path: "/api/images/get?format=src&type=gif"
		},
		src = "";
		/*lols = [
			'http://media.yourdailymedia.com/4/cat_98.gif',
			'http://3.bp.blogspot.com/-TaxA8nFoMZI/UcF3eBfZ76I/AAAAAAAAkDM/DfQHzi4WAvM/s1600/funny-cat-gifs-055-004.gif',
			'http://www.ohmagif.com/wp-content/uploads/2013/03/funny-cat-using-hedgehog-to-comb-its-fur.gif',
			'http://3.bp.blogspot.com/-Oc3wDRTpeMU/UUmGMpCD6VI/AAAAAAAAgrw/ySayS_8pGcE/s1600/funny-cat-gifs-042-001.gif',
			'http://2.bp.blogspot.com/-BtaQ8wVnU2M/UnVpuJWmW0I/AAAAAAAAO0I/FCu9edR-1Sk/s1600/funny-cat-drinking-water.gif',
			'http://1.bp.blogspot.com/-RmCJjQU67NI/Ue-7WNBXJxI/AAAAAAAAnVY/jpvprp0qmfI/s1600/funny-cat-gifs-060-004.gif'
		],
		img = lols[ Math.floor( Math.random() * lols.length ) ];*/

	http.request(httpOpts, function(response){
		if( typeof callback === 'function' ) callback(response.headers.location);
	}).end();
}

function getEbooks(callback){
	http.get("http://horseebooksipsum.com/api/v1/1?links=false&html=false", function(res){
		res.setEncoding('utf8');
		res.on("data", function(chunk){ callback(chunk); });
	});
}


module.exports = basicRoutes;
