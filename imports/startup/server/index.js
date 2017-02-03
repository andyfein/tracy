// starting set of data (if app is loaded with empty db) - TODO
//import './fixtures.js';

// configuring Accounts package to define the UI of the reset password email. TODO
import './reset-password-email.js';

// Security settings TODO
//import './security.js';

// defining all coellections, publications and methods
import './register-api.js';

// disable websockets for uberspace
console.log('disable websockets');
process.env.DISABLE_WEBSOCKETS = 1;
