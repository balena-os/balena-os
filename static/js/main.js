jQuery = $ = require('jquery')
Tether = require('Tether')
require('bootstrap')
require('./docs')
var doxxConfig = require('../../config/doxx')
// Analytics
doxxConfig.layoutLocals.analytics.mixpanelToken ? require('./mixpanel') : console.log("No mixpanel");
