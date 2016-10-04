jQuery = $ = require('jquery')
Tether = require('Tether')
require('bootstrap')
require('./docs')
require('./components')
var doxxConfig = require('../../config/doxx')
// Analytics
doxxConfig.layoutLocals.analytics.mixpanelToken ? require('./mixpanel') : console.log("No mixpanel");
