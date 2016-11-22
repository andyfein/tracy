import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

import './list-explore.html';

Template.List_explore.onCreated(function listExploreOnCreated() {
	this.autorun(() => {
	  new SimpleSchema({
		lcModels: { type: Mongo.Cursor },
	  }).validate(Template.currentData());
	});

});
