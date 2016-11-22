import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './show-body.html';

Template.Show_body.onRendered(function showBodyOnRendered() {
  $('.button-collapse').sideNav({
	closeOnClick: true,
  });
});
