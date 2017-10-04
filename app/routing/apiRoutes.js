var friendData = require ('../data/friends.js');
var path = require('path');
module.exports = function(app){
	app.get('/api/friends', function(req, res){
		res.json(friendData);
	});
	app.post('/api/friends', function(req,res){
	var bestMatch = {
		name: "",
		image: "",
		matchPoints: 1000
	};
	var userData = req.body;
	var userName = userData.name;
	var userImage = userData.image;
	var userPoints = userData.points;
	var pointDifference = 0;
		for(var i=0; i<friendData.length;i++){
			console.log(friendData[i].name);
			pointDifference = 0;
			for(var j =0; j<10; j++){
				pointDifference += Math.abs(parseInt(userPoints[j]) - parseInt(friendData[i].points[j]));
				if (pointDifference <= bestMatch.matchPoints){
					bestMatch.name = friendData[i].name;
					bestMatch.image = friendData[i].image;
					bestMatch.matchPoints = pointDifference;
				}
			}
		}
		friendData.push(userData);
		res.json(bestMatch);
	});
};
