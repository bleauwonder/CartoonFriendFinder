var friends = require("../data/friends");

// routing the apiRoutes
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    // loop through all possible options
    var bestMatch = {
      name: "",
      photo: "", 
      matchDif: 100
    };

    // Take the result of the survey from the user and parse it
    var surveyResults = req.body;
    var userScores = surveyResults.scores;

    // variable used to calculate difference between new user and all other users scores
    var totalDifference = 0;
    // loop through the friends array to get each set of scores for friends
      for (var i = 0; i < friends.length - 1; i++) {
        totalDifference = 0;

      // loop through that friend's score and the user's score to calculate the absolute difference
      for (var j = 0; j < 10; j++) {
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
        if (totalDifference <= bestMatch.matchDif) {
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.matchDif = totalDifference;
          }
        }
      }
    
    surveyResults.friendName = surveyResults.name.replace(/\s+/g, "").toLowerCase();
    surveyResults.scores = surveyResults.scores.map(function (x) {
      return parseInt(x, 10);
    });
    friends.push(surveyResults);

    res.json(bestMatch);
  });
};