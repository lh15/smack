
//initialize app
var app = require('./modules/app.js')

//set up factories
require('./factories/userFactory.js')(app)

require('./factories/teamFactory.js')(app)

require('./factories/postFactory.js')(app)

require('./factories/channelFactory.js')(app)



//set up controllers
require('./controllers/findTeamController.js')(app)

require('./controllers/loginController.js')(app)
require('./controllers/sidebarController.js')(app)
// require('./controllers/users.js')(app)

require('./controllers/mainController.js')(app)
