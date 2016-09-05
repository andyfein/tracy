//TODO multilanguage
import { AccountsTemplates } from 'meteor/useraccounts:core';

AccountsTemplates.configure({
  showForgotPasswordLink: true,
  texts: {
	errors: {
	  loginForbidden: 'Incorrect username or password',
	  pwdMismatch: 'Passwords don\'t match',
	},
	title: {
	  signIn: 'Sign In',
	  signUp: 'Join',
	},
  },
  defaultTemplate: 'Auth_page',
  defaultLayout: 'List_body',
  defaultContentRegion: 'main',
  defaultLayoutRegions: {},
});
