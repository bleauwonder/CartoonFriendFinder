var friends = require("../data/friends");

module.exports = function(app) {
app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

app.post("/api/friends", function(req, res) {
    var surveyResults = req.body;
    surveyResults.friendName = surveyResults.name.replace(/\s+/g, "").toLowerCase();

});
};