smack.controller('loginController', function ($scope, userFactory, $location, $cookies, $routeParams) {
  console.log("reached controller");
  //url of the current team passed in from route params
  $scope.currentTeamURL = $routeParams.teamURL;
  //logged in persona details
  $scope.currentPersona = {};

  //-----------ADD REDIRECTS IF PERSONA IS NOT LOGGED IN-----------------


  //sets errors into scope for display in view
  var errorHandler = function (errors) {
    $scope.validationErrors = errors;
    console.log(errors);
  }
  //callback passed to factory to set currentpersona details into scope
  function setPersona(persona) {
    $scope.currentPersona = persona;
  }
  //get persona data from cookie
  $scope.getPersona = function (params) {
    var currentPersonaId = $cookies.get('currentPersonaId');
    factory.getPersona(currentPersonaId,setPersona, errorHandler);
  }
  //on page reload, getPersona data 
  $scope.getPersona();

  


})

