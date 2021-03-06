
module.exports = function (app) {
  app.controller('findTeamController', function ($scope, userFactory, teamFactory, $location, $cookies) {
    console.log("reached findTeamController");
    //ng-model team from view
    $scope.team = {};
    //validation error from error handler
    $scope.validationErrors = null;
    //array of logged in team urls to create links in view
    $scope.loggedInTeams = [];



    //handles error coming from database and sets into scope
    var errorHandler = function (errors) {
      $scope.validationErrors = errors;
      //maybe reload page?
      console.log(errors);
    }
    //if team exists in db, set redirect to team url
    function setTeam(teamURL) {
      console.log("teamURL: ", teamURL)
      if (teamURL) {
        $cookies.put("currentTeamURL", teamURL)
        $location.path("/" + teamURL);
      } else {
        console.log("team not found");
      }

    }

    var currentTeamURL = $cookies.get('currentTeamURL');
    //check db if team exists
    $scope.findTeam = function () {
      if (!currentTeamURL) {
        teamFactory.findTeam($scope.team, setTeam, errorHandler);
      } else {
        if (currentTeamURL === $scope.team.url) {
          $location.path("/" + currentTeamURL);
        }
      }
    }
  })
}
