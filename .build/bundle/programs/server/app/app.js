var require = meteorInstall({"imports":{"api":{"comps":{"server":{"publications.js":["meteor/meteor","meteor/aldeed:simple-schema","../comps.js","../../lcmodels/lcmodels.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/comps/server/publications.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var Comps;module.import('../comps.js',{"Comps":function(v){Comps=v}});var LcModels;module.import('../../lcmodels/lcmodels.js',{"LcModels":function(v){LcModels=v}});
                                                                                                                       // 2
                                                                                                                       //
                                                                                                                       // 4
                                                                                                                       // 5
                                                                                                                       //
//Meteor.publish('comps.inLcModel', function compsinLcModel(lcmodelId) {                                               //
//  return Comps.find({ lcmodelId });                                                                                  //
//});                                                                                                                  //
Meteor.publishComposite('comps.inLcModel', function compsInLcModel(lcmodelId) {                                        // 10
	new SimpleSchema({                                                                                                    // 11
		lcmodelId: { type: String }                                                                                          // 12
	}).validate({ lcmodelId: lcmodelId });                                                                                // 11
                                                                                                                       //
	return {                                                                                                              // 15
		find: function find() {                                                                                              // 16
			var query = {                                                                                                       // 17
				_id: lcmodelId                                                                                                     // 18
			};                                                                                                                  // 17
                                                                                                                       //
			var options = {                                                                                                     // 21
				fields: { _id: 1 }                                                                                                 // 22
			};                                                                                                                  // 21
                                                                                                                       //
			return LcModels.find(query, options);                                                                               // 25
		},                                                                                                                   // 26
                                                                                                                       //
                                                                                                                       //
		children: [{                                                                                                         // 28
			find: function find(lcmodel) {                                                                                      // 29
				return Comps.find({ lcmodelId: lcmodel._id }, { fields: Comps.publicFields });                                     // 30
			}                                                                                                                   // 31
		}]                                                                                                                   // 28
	};                                                                                                                    // 15
});                                                                                                                    // 34
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"comps.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","meteor/mongo","meteor/aldeed:simple-schema","../regions/regions.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/comps/comps.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({Comps:function(){return Comps}});var _classCallCheck;module.import('babel-runtime/helpers/classCallCheck',{"default":function(v){_classCallCheck=v}});var _possibleConstructorReturn;module.import('babel-runtime/helpers/possibleConstructorReturn',{"default":function(v){_possibleConstructorReturn=v}});var _inherits;module.import('babel-runtime/helpers/inherits',{"default":function(v){_inherits=v}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var Regions;module.import('../regions/regions.js',{"Regions":function(v){Regions=v}});
                                                                                                                       //
                                                                                                                       //
                                                                                                                       // 1
                                                                                                                       // 2
                                                                                                                       //
                                                                                                                       // 4
                                                                                                                       //
//import { Factory }                                                                                                   //
//import faker                                                                                                         //
//                                                                                                                     //
                                                                                                                       //
var CompsCollection = function (_Mongo$Collection) {                                                                   //
  _inherits(CompsCollection, _Mongo$Collection);                                                                       //
                                                                                                                       //
  function CompsCollection() {                                                                                         //
    _classCallCheck(this, CompsCollection);                                                                            //
                                                                                                                       //
    return _possibleConstructorReturn(this, _Mongo$Collection.apply(this, arguments));                                 //
  }                                                                                                                    //
                                                                                                                       //
  CompsCollection.prototype.insert = function insert(comp) {                                                           //
    return _Mongo$Collection.prototype.insert.call(this, comp);                                                        // 13
  };                                                                                                                   // 14
                                                                                                                       //
  CompsCollection.prototype.update = function update(selector, modifier) {                                             //
    return _Mongo$Collection.prototype.update.call(this, selector, modifier);                                          // 16
  };                                                                                                                   // 17
                                                                                                                       //
  CompsCollection.prototype.remove = function remove(selector) {                                                       //
    return _Mongo$Collection.prototype.remove.call(this, selector);                                                    // 19
  };                                                                                                                   // 20
                                                                                                                       //
  return CompsCollection;                                                                                              //
}(Mongo.Collection);                                                                                                   //
                                                                                                                       //
var Comps = new CompsCollection('Comps');                                                                              // 23
                                                                                                                       //
Comps.deny({                                                                                                           // 25
  insert: function insert() {                                                                                          // 26
    return true;                                                                                                       // 26
  },                                                                                                                   // 26
  update: function update() {                                                                                          // 27
    return true;                                                                                                       // 27
  },                                                                                                                   // 27
  remove: function remove() {                                                                                          // 28
    return true;                                                                                                       // 28
  }                                                                                                                    // 28
});                                                                                                                    // 25
                                                                                                                       //
Comps.schema = new SimpleSchema({                                                                                      // 31
  _id: {                                                                                                               // 32
    type: String,                                                                                                      // 33
    regEx: SimpleSchema.RegEx.Id                                                                                       // 34
  },                                                                                                                   // 32
  lcmodelId: {                                                                                                         // 36
    type: String,                                                                                                      // 37
    regEx: SimpleSchema.RegEx.Id,                                                                                      // 38
    denyUpdate: true                                                                                                   // 39
  },                                                                                                                   // 36
  name: {                                                                                                              // 41
    type: String,                                                                                                      // 42
    max: 100,                                                                                                          // 43
    optional: true                                                                                                     // 44
  },                                                                                                                   // 41
  firmName: {                                                                                                          // 46
    type: String,                                                                                                      // 47
    max: 100,                                                                                                          // 48
    optional: true                                                                                                     // 49
  },                                                                                                                   // 46
  siteLocation: {                                                                                                      // 51
    type: String,                                                                                                      // 52
    max: 100,                                                                                                          // 53
    //TODO no regex to allow empty strings - better idea?                                                              //
    //regEx: SimpleSchema.RegEx.Id,                                                                                    //
    optional: true                                                                                                     // 56
  },                                                                                                                   // 51
  x: {                                                                                                                 // 58
    type: Number                                                                                                       // 59
  },                                                                                                                   // 58
  y: {                                                                                                                 // 61
    type: Number                                                                                                       // 62
  },                                                                                                                   // 61
  isRetracted: {                                                                                                       // 64
    type: Boolean                                                                                                      // 65
  },                                                                                                                   // 64
  hasRetracted: {                                                                                                      // 67
    type: Boolean                                                                                                      // 68
  },                                                                                                                   // 67
  isRoot: {                                                                                                            // 70
    type: Boolean,                                                                                                     // 71
    optional: true                                                                                                     // 72
  },                                                                                                                   // 70
  contacted: {                                                                                                         // 74
    type: Boolean                                                                                                      // 75
  },                                                                                                                   // 74
  visited: {                                                                                                           // 77
    type: Boolean                                                                                                      // 78
  },                                                                                                                   // 77
  negotiating: {                                                                                                       // 80
    type: Boolean                                                                                                      // 81
  }                                                                                                                    // 80
});                                                                                                                    // 31
                                                                                                                       //
Comps.attachSchema(Comps.schema);                                                                                      // 85
                                                                                                                       //
Comps.publicFields = {                                                                                                 // 87
  lcmodelId: 1,                                                                                                        // 88
  name: 1,                                                                                                             // 89
  firmName: 1,                                                                                                         // 90
  siteLocation: 1,                                                                                                     // 91
  x: 1,                                                                                                                // 92
  y: 1,                                                                                                                // 93
  contacted: 1,                                                                                                        // 94
  visited: 1,                                                                                                          // 95
  negotiating: 1                                                                                                       // 96
};                                                                                                                     // 87
                                                                                                                       //
Comps.helpers({                                                                                                        // 99
  region: function region() {                                                                                          // 100
    return Regions.findOne({ _id: this.siteLocation });                                                                // 101
  }                                                                                                                    // 102
});                                                                                                                    // 99
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"methods.js":["meteor/meteor","meteor/underscore","meteor/mdg:validated-method","meteor/aldeed:simple-schema","meteor/ddp-rate-limiter","./comps.js","../connects/connects.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/comps/methods.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({insert:function(){return insert},updateInfo:function(){return updateInfo},updatePosition:function(){return updatePosition},remove:function(){return remove},toggleRetract:function(){return toggleRetract}});var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var _;module.import('meteor/underscore',{"_":function(v){_=v}});var ValidatedMethod;module.import('meteor/mdg:validated-method',{"ValidatedMethod":function(v){ValidatedMethod=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var DDPRateLimiter;module.import('meteor/ddp-rate-limiter',{"DDPRateLimiter":function(v){DDPRateLimiter=v}});var Comps;module.import('./comps.js',{"Comps":function(v){Comps=v}});var Connects;module.import('../connects/connects.js',{"Connects":function(v){Connects=v}});
                                                                                                                       // 2
                                                                                                                       // 3
                                                                                                                       // 4
                                                                                                                       // 5
                                                                                                                       //
                                                                                                                       // 7
                                                                                                                       // 8
                                                                                                                       //
var insert = new ValidatedMethod({                                                                                     // 10
	name: 'comps.insert',                                                                                                 // 11
	validate: Comps.simpleSchema().pick(['lcmodelId', 'name', 'firmName', 'siteLocation', 'x', 'y']).validator({ clean: true, filter: false }),
	//applyOptions: {                                                                                                     //
	//  onResultReceived: (error, result) => {                                                                            //
	//    console.log('method call');                                                                                     //
	//    console.log(result);                                                                                            //
	//  }                                                                                                                 //
	//},                                                                                                                  //
	run: function run(_ref) {                                                                                             // 19
		var lcmodelId = _ref.lcmodelId;                                                                                      // 19
		var name = _ref.name;                                                                                                // 19
		var firmName = _ref.firmName;                                                                                        // 19
		var siteLocation = _ref.siteLocation;                                                                                // 19
		var x = _ref.x;                                                                                                      // 19
		var y = _ref.y;                                                                                                      // 19
                                                                                                                       //
		//TODO sanity checks                                                                                                 //
                                                                                                                       //
		var comp = {                                                                                                         // 22
			lcmodelId: lcmodelId,                                                                                               // 23
			name: name,                                                                                                         // 24
			firmName: firmName,                                                                                                 // 25
			siteLocation: siteLocation,                                                                                         // 26
			x: x,                                                                                                               // 27
			y: y,                                                                                                               // 28
			contacted: false,                                                                                                   // 29
			visited: false,                                                                                                     // 30
			negotiating: false,                                                                                                 // 31
			hasRetracted: false,                                                                                                // 32
			isRetracted: false                                                                                                  // 33
		};                                                                                                                   // 22
                                                                                                                       //
		return Comps.insert(comp);                                                                                           // 36
	}                                                                                                                     // 37
});                                                                                                                    // 10
                                                                                                                       //
var updateInfo = new ValidatedMethod({                                                                                 // 40
	name: 'comps.updateInfo',                                                                                             // 41
	validate: new SimpleSchema({                                                                                          // 42
		compId: Comps.simpleSchema().schema('_id'),                                                                          // 43
		name: Comps.simpleSchema().schema('name'),                                                                           // 44
		firmName: Comps.simpleSchema().schema('firmName'),                                                                   // 45
		siteLocation: Comps.simpleSchema().schema('siteLocation'),                                                           // 46
		contacted: Comps.simpleSchema().schema('contacted'),                                                                 // 47
		visited: Comps.simpleSchema().schema('visited'),                                                                     // 48
		negotiating: Comps.simpleSchema().schema('negotiating')                                                              // 49
		//TODO clean set to false to allow for empty strings - any better idea?                                              //
	}).validator({ clean: false, filter: false }),                                                                        // 42
	run: function run(_ref2) {                                                                                            // 52
		var compId = _ref2.compId;                                                                                           // 52
		var name = _ref2.name;                                                                                               // 52
		var firmName = _ref2.firmName;                                                                                       // 52
		var siteLocation = _ref2.siteLocation;                                                                               // 52
		var contacted = _ref2.contacted;                                                                                     // 52
		var visited = _ref2.visited;                                                                                         // 52
		var negotiating = _ref2.negotiating;                                                                                 // 52
                                                                                                                       //
		//TODO validate                                                                                                      //
		Comps.update(compId, {                                                                                               // 54
			$set: { name: name, firmName: firmName, siteLocation: siteLocation, contacted: contacted, visited: visited, negotiating: negotiating }
		});                                                                                                                  // 54
	}                                                                                                                     // 57
});                                                                                                                    // 40
                                                                                                                       //
var updatePosition = new ValidatedMethod({                                                                             // 60
	name: 'comps.updatePosition',                                                                                         // 61
	validate: new SimpleSchema({                                                                                          // 62
		compId: Comps.simpleSchema().schema('_id'),                                                                          // 63
		newX: Comps.simpleSchema().schema('x'),                                                                              // 64
		newY: Comps.simpleSchema().schema('y')                                                                               // 65
	}).validator({ clean: true, filter: false }),                                                                         // 62
	run: function run(_ref3) {                                                                                            // 67
		var compId = _ref3.compId;                                                                                           // 67
		var newX = _ref3.newX;                                                                                               // 67
		var newY = _ref3.newY;                                                                                               // 67
                                                                                                                       //
		//TODO validate                                                                                                      //
		var initialComp = Comps.findOne({ _id: compId });                                                                    // 69
		var oldX = initialComp.x;                                                                                            // 70
		var oldY = initialComp.y;                                                                                            // 71
		var diffX = newX - oldX;                                                                                             // 72
		var diffY = newY - oldY;                                                                                             // 73
		Comps.update(compId, {                                                                                               // 74
			$set: { x: newX, y: newY }                                                                                          // 75
		});                                                                                                                  // 74
		moveChildren(compId);                                                                                                // 77
		function moveChildren(parentCompId) {                                                                                // 78
			var connects = Connects.find({ parentCompId: parentCompId });                                                       // 79
			connects.forEach(function (connect) {                                                                               // 80
				var childComp = Comps.findOne({ _id: connect.childCompId });                                                       // 81
				oldX = childComp.x;                                                                                                // 82
				oldY = childComp.y;                                                                                                // 83
				newX = oldX + diffX;                                                                                               // 84
				newY = oldY + diffY;                                                                                               // 85
				Comps.update(connect.childCompId, { $set: { x: newX, y: newY } });                                                 // 86
				moveChildren(connect.childCompId);                                                                                 // 87
			});                                                                                                                 // 88
		}                                                                                                                    // 89
	}                                                                                                                     // 90
});                                                                                                                    // 60
                                                                                                                       //
var remove = new ValidatedMethod({                                                                                     // 93
	name: 'comps.remove',                                                                                                 // 94
	validate: new SimpleSchema({ compId: Comps.simpleSchema().schema('_id') }).validator({ clean: true, filter: false }),
	run: function run(_ref4) {                                                                                            // 96
		var compId = _ref4.compId;                                                                                           // 96
                                                                                                                       //
		//TODO sanity checks                                                                                                 //
		Connects.remove({ $or: [{ parentCompId: compId }, { childCompId: compId }] });                                       // 98
		Comps.remove(compId);                                                                                                // 99
	}                                                                                                                     // 100
});                                                                                                                    // 93
                                                                                                                       //
var toggleRetract = new ValidatedMethod({                                                                              // 103
	name: 'comps.toggleRetract',                                                                                          // 104
	validate: new SimpleSchema({ compId: Comps.simpleSchema().schema('_id') }).validator({ clean: true, filter: false }),
	run: function run(_ref5) {                                                                                            // 106
		var compId = _ref5.compId;                                                                                           // 106
                                                                                                                       //
		var initialComp = Comps.findOne({ _id: compId });                                                                    // 107
		var retractState = initialComp.hasRetracted;                                                                         // 108
		Comps.update(compId, { $set: { hasRetracted: !retractState } });                                                     // 109
		retractChildren(compId);                                                                                             // 110
		function retractChildren(parentCompId) {                                                                             // 111
			var connects = Connects.find({ parentCompId: parentCompId });                                                       // 112
			connects.forEach(function (connect) {                                                                               // 113
				Connects.update({ childCompId: connect.childCompId }, { $set: { isRetracted: !retractState } });                   // 114
				Comps.update(connect.childCompId, { $set: { isRetracted: !retractState, hasRetracted: false } });                  // 115
				retractChildren(connect.childCompId);                                                                              // 116
			});                                                                                                                 // 117
		}                                                                                                                    // 118
	}                                                                                                                     // 119
});                                                                                                                    // 103
                                                                                                                       //
var COMPS_METHODS = _.pluck([insert, updateInfo, updatePosition, toggleRetract, remove], 'name');                      // 122
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 130
	DDPRateLimiter.addRule({                                                                                              // 131
		name: function name(_name) {                                                                                         // 132
			return _.contains(COMPS_METHODS, _name);                                                                            // 133
		},                                                                                                                   // 134
		connectionId: function connectionId() {                                                                              // 135
			return true;                                                                                                        // 135
		}                                                                                                                    // 135
	}, 5, 1000);                                                                                                          // 131
}                                                                                                                      // 137
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"connects":{"server":{"publications.js":["meteor/meteor","meteor/aldeed:simple-schema","../connects.js","../../lcmodels/lcmodels.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/connects/server/publications.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var Connects;module.import('../connects.js',{"Connects":function(v){Connects=v}});var LcModels;module.import('../../lcmodels/lcmodels.js',{"LcModels":function(v){LcModels=v}});
                                                                                                                       // 2
                                                                                                                       //
                                                                                                                       // 4
                                                                                                                       // 5
                                                                                                                       //
Meteor.publishComposite('connects.inLcModel', function connectsInLcModel(lcmodelId) {                                  // 7
	//TODO publish/update/delete dependent on Comps?                                                                      //
	new SimpleSchema({                                                                                                    // 9
		lcmodelId: { type: String }                                                                                          // 10
	}).validate({ lcmodelId: lcmodelId });                                                                                // 9
                                                                                                                       //
	return {                                                                                                              // 13
		find: function find() {                                                                                              // 14
			var query = {                                                                                                       // 15
				_id: lcmodelId                                                                                                     // 16
			};                                                                                                                  // 15
                                                                                                                       //
			var options = {                                                                                                     // 19
				fields: { _id: 1 }                                                                                                 // 20
			};                                                                                                                  // 19
                                                                                                                       //
			return LcModels.find(query, options);                                                                               // 23
		},                                                                                                                   // 24
                                                                                                                       //
                                                                                                                       //
		children: [{                                                                                                         // 26
			find: function find(lcmodel) {                                                                                      // 27
				return Connects.find({ lcmodelId: lcmodel._id }, { fields: Connects.publicFields });                               // 28
			}                                                                                                                   // 29
		}]                                                                                                                   // 26
	};                                                                                                                    // 13
});                                                                                                                    // 32
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"connects.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","meteor/mongo","meteor/aldeed:simple-schema","../comps/comps.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/connects/connects.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({Connects:function(){return Connects}});var _classCallCheck;module.import('babel-runtime/helpers/classCallCheck',{"default":function(v){_classCallCheck=v}});var _possibleConstructorReturn;module.import('babel-runtime/helpers/possibleConstructorReturn',{"default":function(v){_possibleConstructorReturn=v}});var _inherits;module.import('babel-runtime/helpers/inherits',{"default":function(v){_inherits=v}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var Comps;module.import('../comps/comps.js',{"Comps":function(v){Comps=v}});
                                                                                                                       //
                                                                                                                       //
                                                                                                                       // 1
                                                                                                                       //
                                                                                                                       // 3
                                                                                                                       //
                                                                                                                       // 5
                                                                                                                       //
var ConnectsCollection = function (_Mongo$Collection) {                                                                //
  _inherits(ConnectsCollection, _Mongo$Collection);                                                                    //
                                                                                                                       //
  function ConnectsCollection() {                                                                                      //
    _classCallCheck(this, ConnectsCollection);                                                                         //
                                                                                                                       //
    return _possibleConstructorReturn(this, _Mongo$Collection.apply(this, arguments));                                 //
  }                                                                                                                    //
                                                                                                                       //
  ConnectsCollection.prototype.insert = function insert(connect) {                                                     //
    _Mongo$Collection.prototype.insert.call(this, connect);                                                            // 9
  };                                                                                                                   // 10
                                                                                                                       //
  ConnectsCollection.prototype.remove = function remove(selector) {                                                    //
    _Mongo$Collection.prototype.remove.call(this, selector);                                                           // 12
  };                                                                                                                   // 13
                                                                                                                       //
  return ConnectsCollection;                                                                                           //
}(Mongo.Collection);                                                                                                   //
                                                                                                                       //
var Connects = new ConnectsCollection('Connects');                                                                     // 16
                                                                                                                       //
Connects.deny({                                                                                                        // 18
  insert: function insert() {                                                                                          // 19
    return true;                                                                                                       // 19
  },                                                                                                                   // 19
  remove: function remove() {                                                                                          // 20
    return true;                                                                                                       // 20
  }                                                                                                                    // 20
});                                                                                                                    // 18
                                                                                                                       //
Connects.schema = new SimpleSchema({                                                                                   // 23
  _id: {                                                                                                               // 24
    type: String,                                                                                                      // 25
    regEx: SimpleSchema.RegEx.Id                                                                                       // 26
  },                                                                                                                   // 24
  lcmodelId: {                                                                                                         // 28
    type: String,                                                                                                      // 29
    regEx: SimpleSchema.RegEx.Id                                                                                       // 30
  },                                                                                                                   // 28
  parentCompId: {                                                                                                      // 32
    type: String,                                                                                                      // 33
    regEx: SimpleSchema.RegEx.Id                                                                                       // 34
  },                                                                                                                   // 32
  childCompId: {                                                                                                       // 36
    type: String,                                                                                                      // 37
    regEx: SimpleSchema.RegEx.Id                                                                                       // 38
  },                                                                                                                   // 36
  isRetracted: {                                                                                                       // 40
    type: Boolean                                                                                                      // 41
  }                                                                                                                    // 40
});                                                                                                                    // 23
                                                                                                                       //
Connects.attachSchema(Connects.schema);                                                                                // 45
                                                                                                                       //
Connects.publicFields = {                                                                                              // 47
  lcModelId: 1,                                                                                                        // 48
  parentCompId: 1,                                                                                                     // 49
  childCompId: 1                                                                                                       // 50
};                                                                                                                     // 47
                                                                                                                       //
Connects.helpers({                                                                                                     // 53
  parent: function parent() {                                                                                          // 54
    return Comps.findOne({ _id: this.parentCompId });                                                                  // 55
  },                                                                                                                   // 56
  child: function child() {                                                                                            // 57
    return Comps.findOne({ _id: this.childCompId });                                                                   // 58
  }                                                                                                                    // 59
});                                                                                                                    // 53
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"methods.js":["meteor/meteor","meteor/underscore","meteor/mdg:validated-method","meteor/aldeed:simple-schema","meteor/ddp-rate-limiter","./connects.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/connects/methods.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({connect:function(){return connect},disconnect:function(){return disconnect}});var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var _;module.import('meteor/underscore',{"_":function(v){_=v}});var ValidatedMethod;module.import('meteor/mdg:validated-method',{"ValidatedMethod":function(v){ValidatedMethod=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var DDPRateLimiter;module.import('meteor/ddp-rate-limiter',{"DDPRateLimiter":function(v){DDPRateLimiter=v}});var Connects;module.import('./connects.js',{"Connects":function(v){Connects=v}});
                                                                                                                       //
                                                                                                                       // 3
                                                                                                                       // 4
                                                                                                                       // 5
                                                                                                                       // 6
                                                                                                                       //
                                                                                                                       // 8
                                                                                                                       //
var connect = new ValidatedMethod({                                                                                    // 10
  name: 'connects.connect',                                                                                            // 11
  validate: Connects.simpleSchema().pick(['lcmodelId', 'parentCompId', 'childCompId']).validator({ clean: true, filter: false }),
  run: function run(_ref) {                                                                                            // 13
    var lcmodelId = _ref.lcmodelId;                                                                                    // 13
    var parentCompId = _ref.parentCompId;                                                                              // 13
    var childCompId = _ref.childCompId;                                                                                // 13
                                                                                                                       //
    var connect = {                                                                                                    // 14
      lcmodelId: lcmodelId,                                                                                            // 15
      parentCompId: parentCompId,                                                                                      // 16
      childCompId: childCompId,                                                                                        // 17
      isRetracted: false                                                                                               // 18
    };                                                                                                                 // 14
                                                                                                                       //
    Connects.insert(connect);                                                                                          // 21
  }                                                                                                                    // 22
});                                                                                                                    // 10
                                                                                                                       //
var disconnect = new ValidatedMethod({                                                                                 // 25
  name: 'connects.disconnect',                                                                                         // 26
  validate: new SimpleSchema({ connectId: Connects.simpleSchema().schema('_id') }).validator({ clean: true, filter: false }),
  run: function run(_ref2) {                                                                                           // 28
    var connectId = _ref2.connectId;                                                                                   // 28
                                                                                                                       //
    Connects.remove(connectId);                                                                                        // 29
  }                                                                                                                    // 30
});                                                                                                                    // 25
                                                                                                                       //
var CONNECTS_METHODS = _.pluck([connect, disconnect], 'name');                                                         // 33
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 38
  DDPRateLimiter.addRule({                                                                                             // 39
    name: function name(_name) {                                                                                       // 40
      return _.contains(CONNECTS_METHODS, _name);                                                                      // 41
    },                                                                                                                 // 42
    connectionId: function connectionId() {                                                                            // 43
      return true;                                                                                                     // 43
    }                                                                                                                  // 43
  }, 5, 1000);                                                                                                         // 39
}                                                                                                                      // 45
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"lcmodels":{"server":{"publications.js":["meteor/meteor","../lcmodels.js","../../riskmodels/riskmodels.js","../../comps/comps.js","../../connects/connects.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/lcmodels/server/publications.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var LcModels;module.import('../lcmodels.js',{"LcModels":function(v){LcModels=v}});var RiskModels;module.import('../../riskmodels/riskmodels.js',{"RiskModels":function(v){RiskModels=v}});var Comps;module.import('../../comps/comps.js',{"Comps":function(v){Comps=v}});var Connects;module.import('../../connects/connects.js',{"Connects":function(v){Connects=v}});
                                                                                                                       //
                                                                                                                       // 3
                                                                                                                       // 4
                                                                                                                       // 5
                                                                                                                       // 6
                                                                                                                       //
// Publish all Life Cycle Models (without comps/connects/ for lists                                                    //
Meteor.publishComposite('lcModels', function lcModels() {                                                              // 9
	return {                                                                                                              // 10
		find: function find() {                                                                                              // 11
			return LcModels.find({});                                                                                           // 12
		},                                                                                                                   // 13
                                                                                                                       //
		children: [{                                                                                                         // 14
			find: function find(lcModel) {                                                                                      // 16
				return RiskModels.find({ _id: lcModel.riskModelId });                                                              // 17
			}                                                                                                                   // 18
		}]                                                                                                                   // 15
	};                                                                                                                    // 10
});                                                                                                                    // 22
                                                                                                                       //
// Publish details of one Life Cycle Model                                                                             //
Meteor.publishComposite('lcModelById', function lcModelById(lcModelId) {                                               // 25
	return {                                                                                                              // 26
		find: function find() {                                                                                              // 27
			return LcModels.find({ _id: lcModelId });                                                                           // 28
		},                                                                                                                   // 29
                                                                                                                       //
		children: [{                                                                                                         // 30
			find: function find(lcModel) {                                                                                      // 32
				return RiskModels.find({ _id: lcModel.riskModelId });                                                              // 33
			}                                                                                                                   // 34
		}, {                                                                                                                 // 31
			find: function find(lcModel) {                                                                                      // 37
				return Comps.find({ lcmodelId: lcModel._id });                                                                     // 38
			}                                                                                                                   // 39
		}, {                                                                                                                 // 36
			find: function find(lcModel) {                                                                                      // 42
				return Connects.find({ lcmodelId: lcModel._id });                                                                  // 43
			}                                                                                                                   // 44
		}]                                                                                                                   // 41
	};                                                                                                                    // 26
});                                                                                                                    // 48
                                                                                                                       //
//Meteor.publish('lcmodels.public', function lcmodelsPublic() {                                                        //
//  return LcModels.find({                                                                                             //
//    userId: { $exists: false },                                                                                      //
//  }, {                                                                                                               //
//    fields: LcModels.publicFields,                                                                                   //
//  });                                                                                                                //
//});                                                                                                                  //
//                                                                                                                     //
//Meteor.publish('lcmodels.private', function lcmodelsPrivate() {                                                      //
//  if (!this.userId) {                                                                                                //
//    return this.ready();                                                                                             //
//  }                                                                                                                  //
//                                                                                                                     //
//  return LcModels.find({                                                                                             //
//    userId: this.userId,                                                                                             //
//  }, {                                                                                                               //
//    fields: LcModels.publicFields,                                                                                   //
//  });                                                                                                                //
//});                                                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"lcmodels.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","meteor/mongo","meteor/aldeed:simple-schema","../comps/comps.js","../connects/connects.js","../riskmodels/riskmodels.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/lcmodels/lcmodels.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({LcModels:function(){return LcModels}});var _classCallCheck;module.import('babel-runtime/helpers/classCallCheck',{"default":function(v){_classCallCheck=v}});var _possibleConstructorReturn;module.import('babel-runtime/helpers/possibleConstructorReturn',{"default":function(v){_possibleConstructorReturn=v}});var _inherits;module.import('babel-runtime/helpers/inherits',{"default":function(v){_inherits=v}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var Comps;module.import('../comps/comps.js',{"Comps":function(v){Comps=v}});var Connects;module.import('../connects/connects.js',{"Connects":function(v){Connects=v}});var RiskModels;module.import('../riskmodels/riskmodels.js',{"RiskModels":function(v){RiskModels=v}});
                                                                                                                       //
                                                                                                                       //
                                                                                                                       // 1
                                                                                                                       // 2
//import { Factory } from 'meteor/factory';                                                                            //
//                                                                                                                     //
                                                                                                                       // 5
                                                                                                                       // 6
                                                                                                                       // 7
                                                                                                                       //
var LcModelsCollection = function (_Mongo$Collection) {                                                                //
  _inherits(LcModelsCollection, _Mongo$Collection);                                                                    //
                                                                                                                       //
  function LcModelsCollection() {                                                                                      //
    _classCallCheck(this, LcModelsCollection);                                                                         //
                                                                                                                       //
    return _possibleConstructorReturn(this, _Mongo$Collection.apply(this, arguments));                                 //
  }                                                                                                                    //
                                                                                                                       //
  LcModelsCollection.prototype.insert = function insert(lcmodel, callback) {                                           //
    //TODO validation                                                                                                  //
    return _Mongo$Collection.prototype.insert.call(this, lcmodel, callback);                                           // 12
  };                                                                                                                   // 13
                                                                                                                       //
  LcModelsCollection.prototype.remove = function remove(selector, callback) {                                          //
    // TODO  remove components etc                                                                                     //
    return _Mongo$Collection.prototype.remove.call(this, selector, callback);                                          // 16
  };                                                                                                                   // 17
                                                                                                                       //
  return LcModelsCollection;                                                                                           //
}(Mongo.Collection);                                                                                                   //
                                                                                                                       //
var LcModels = new LcModelsCollection('LcModels');                                                                     // 20
                                                                                                                       //
// Deny all client-side updates since we will be using methods to manage this collection                               //
LcModels.deny({                                                                                                        // 23
  insert: function insert() {                                                                                          // 24
    return true;                                                                                                       // 24
  },                                                                                                                   // 24
  update: function update() {                                                                                          // 25
    return true;                                                                                                       // 25
  },                                                                                                                   // 25
  remove: function remove() {                                                                                          // 26
    return true;                                                                                                       // 26
  }                                                                                                                    // 26
});                                                                                                                    // 23
                                                                                                                       //
LcModels.schema = new SimpleSchema({                                                                                   // 29
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },                                                                 // 30
  name: { type: String },                                                                                              // 31
  riskModelId: { type: String, regEx: SimpleSchema.RegEx.Id },                                                         // 32
  userId: { type: String, regEx: SimpleSchema.RegEx.Id }                                                               // 33
});                                                                                                                    // 29
                                                                                                                       //
// root: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true},                                                //
LcModels.attachSchema(LcModels.schema);                                                                                // 37
                                                                                                                       //
// This represents the keys from objects that should be published                                                      //
// to the client. If we add secret properties to objects, don't list                                                   //
// them here to keep them private to the server.                                                                       //
LcModels.publicFields = {                                                                                              // 42
  name: 1,                                                                                                             // 43
  riskModelId: 1,                                                                                                      // 44
  userId: 1                                                                                                            // 45
};                                                                                                                     // 42
                                                                                                                       //
//Factory.define('list', Lists, {});                                                                                   //
                                                                                                                       //
LcModels.helpers({                                                                                                     // 50
  riskModel: function riskModel() {                                                                                    // 51
    return RiskModels.findOne({ _id: this.riskModelId });                                                              // 52
  },                                                                                                                   // 53
  comps: function comps() {                                                                                            // 54
    return Comps.find({ lcmodelId: this._id, isRetracted: false });                                                    // 55
  },                                                                                                                   // 56
  connects: function connects() {                                                                                      // 57
    return Connects.find({ lcmodelId: this._id, isRetracted: false });                                                 // 58
  }                                                                                                                    // 59
});                                                                                                                    // 50
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"methods.js":["meteor/meteor","meteor/mdg:validated-method","meteor/aldeed:simple-schema","meteor/ddp-rate-limiter","meteor/underscore","./lcmodels.js","../comps/comps.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/lcmodels/methods.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({insert:function(){return insert},remove:function(){return remove}});var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var ValidatedMethod;module.import('meteor/mdg:validated-method',{"ValidatedMethod":function(v){ValidatedMethod=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var DDPRateLimiter;module.import('meteor/ddp-rate-limiter',{"DDPRateLimiter":function(v){DDPRateLimiter=v}});var _;module.import('meteor/underscore',{"_":function(v){_=v}});var LcModels;module.import('./lcmodels.js',{"LcModels":function(v){LcModels=v}});var Comps;module.import('../comps/comps.js',{"Comps":function(v){Comps=v}});
                                                                                                                       // 2
                                                                                                                       // 3
                                                                                                                       // 4
                                                                                                                       // 5
                                                                                                                       //
                                                                                                                       // 7
                                                                                                                       // 8
                                                                                                                       //
var LCMODEL_ID_ONLY = new SimpleSchema({                                                                               // 10
  lcModelId: LcModels.simpleSchema().schema('_id')                                                                     // 11
}).validator({ clean: true, filter: false });                                                                          // 10
                                                                                                                       //
var insert = new ValidatedMethod({                                                                                     // 14
  name: 'lcmodels.insert',                                                                                             // 15
  validate: LcModels.simpleSchema().pick(['name', 'riskModelId', 'userId']).validator({ clean: true, filter: false }),
  run: function run(_ref) {                                                                                            // 17
    var name = _ref.name;                                                                                              // 17
    var riskModelId = _ref.riskModelId;                                                                                // 17
    var userId = _ref.userId;                                                                                          // 17
                                                                                                                       //
    var lcmodelId = LcModels.insert({ name: name, riskModelId: riskModelId, userId: userId });                         // 18
                                                                                                                       //
    // TODO invoke  own insert function                                                                                //
    var initialComp = {                                                                                                // 21
      lcmodelId: lcmodelId,                                                                                            // 22
      isRoot: true,                                                                                                    // 23
      name: name,                                                                                                      // 24
      firmName: 'unknown',                                                                                             // 25
      siteLocation: 'unknown',                                                                                         // 26
      x: 0,                                                                                                            // 27
      y: 0,                                                                                                            // 28
      contacted: false,                                                                                                // 29
      visited: false,                                                                                                  // 30
      negotiating: false,                                                                                              // 31
      hasRetracted: false,                                                                                             // 32
      isRetracted: false                                                                                               // 33
    };                                                                                                                 // 21
    var initialCompId = Comps.insert(initialComp);                                                                     // 35
                                                                                                                       //
    //LcModels.update({_id: lcmodelId}, {root: initialCompId});                                                        //
                                                                                                                       //
    return lcmodelId;                                                                                                  // 39
  }                                                                                                                    // 40
});                                                                                                                    // 14
                                                                                                                       //
//export const makePrivate = new ValidatedMethod({                                                                     //
//  name: 'lists.makePrivate',                                                                                         //
//  validate: LIST_ID_ONLY,                                                                                            //
//  run({ listId }) {                                                                                                  //
//    if (!this.userId) {                                                                                              //
//      throw new Meteor.Error('lists.makePrivate.notLoggedIn',                                                        //
//        'Must be logged in to make private lists.');                                                                 //
//    }                                                                                                                //
//                                                                                                                     //
//    const list = Lists.findOne(listId);                                                                              //
//                                                                                                                     //
//    if (list.isLastPublicList()) {                                                                                   //
//      throw new Meteor.Error('lists.makePrivate.lastPublicList',                                                     //
//        'Cannot make the last public list private.');                                                                //
//    }                                                                                                                //
//                                                                                                                     //
//    Lists.update(listId, {                                                                                           //
//      $set: { userId: this.userId },                                                                                 //
//    });                                                                                                              //
//  },                                                                                                                 //
//});                                                                                                                  //
//                                                                                                                     //
//export const makePublic = new ValidatedMethod({                                                                      //
//  name: 'lists.makePublic',                                                                                          //
//  validate: LIST_ID_ONLY,                                                                                            //
//  run({ listId }) {                                                                                                  //
//    if (!this.userId) {                                                                                              //
//      throw new Meteor.Error('lists.makePublic.notLoggedIn',                                                         //
//        'Must be logged in.');                                                                                       //
//    }                                                                                                                //
//                                                                                                                     //
//    const list = Lists.findOne(listId);                                                                              //
//                                                                                                                     //
//    if (!list.editableBy(this.userId)) {                                                                             //
//      throw new Meteor.Error('lists.makePublic.accessDenied',                                                        //
//        'You don\'t have permission to edit this list.');                                                            //
//    }                                                                                                                //
                                                                                                                       //
// XXX the security check above is not atomic, so in theory a race condition could                                     //
//    // result in exposing private data                                                                               //
//    Lists.update(listId, {                                                                                           //
//      $unset: { userId: true },                                                                                      //
//    });                                                                                                              //
//  },                                                                                                                 //
//});                                                                                                                  //
                                                                                                                       //
//export const updateName = new ValidatedMethod({                                                                      //
//  name: 'lists.updateName',                                                                                          //
//  validate: new SimpleSchema({                                                                                       //
//    listId: Lists.simpleSchema().schema('_id'),                                                                      //
//    newName: Lists.simpleSchema().schema('name'),                                                                    //
//  }).validator({ clean: true, filter: false }),                                                                      //
//  run({ listId, newName }) {                                                                                         //
//    const list = Lists.findOne(listId);                                                                              //
//                                                                                                                     //
//    if (!list.editableBy(this.userId)) {                                                                             //
//      throw new Meteor.Error('lists.updateName.accessDenied',                                                        //
//        'You don\'t have permission to edit this list.');                                                            //
//    }                                                                                                                //
//                                                                                                                     //
//    // XXX the security check above is not atomic, so in theory a race condition could                               //
//    // result in exposing private data                                                                               //
//                                                                                                                     //
//    Lists.update(listId, {                                                                                           //
//      $set: { name: newName },                                                                                       //
//    });                                                                                                              //
//  },                                                                                                                 //
//});                                                                                                                  //
                                                                                                                       //
var remove = new ValidatedMethod({                                                                                     // 112
  name: 'lcmodels.remove',                                                                                             // 113
  validate: LCMODEL_ID_ONLY,                                                                                           // 114
  run: function run(_ref2) {                                                                                           // 115
    var lcModelId = _ref2.lcModelId;                                                                                   // 115
                                                                                                                       //
    //    const list = Lists.findOne(listId);                                                                          //
    //                                                                                                                 //
    //    if (!list.editableBy(this.userId)) {                                                                         //
    //      throw new Meteor.Error('lists.remove.accessDenied',                                                        //
    //        'You don\'t have permission to remove this list.');                                                      //
    //    }                                                                                                            //
    //                                                                                                                 //
    //    // XXX the security check above is not atomic, so in theory a race condition could                           //
    //    // result in exposing private data                                                                           //
    //                                                                                                                 //
    //    if (list.isLastPublicList()) {                                                                               //
    //      throw new Meteor.Error('lists.remove.lastPublicList',                                                      //
    //        'Cannot delete the last public list.');                                                                  //
    //    }                                                                                                            //
                                                                                                                       //
    LcModels.remove(lcModelId);                                                                                        // 131
  }                                                                                                                    // 132
});                                                                                                                    // 112
                                                                                                                       //
// Get list of all method names on Lists                                                                               //
var LISTS_METHODS = _.pluck([insert, remove], 'name');                                                                 // 136
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 141
  // Only allow 5 list operations per connection per second                                                            //
  DDPRateLimiter.addRule({                                                                                             // 143
    name: function name(_name) {                                                                                       // 144
      return _.contains(LISTS_METHODS, _name);                                                                         // 145
    },                                                                                                                 // 146
                                                                                                                       //
                                                                                                                       //
    // Rate limit per connection ID                                                                                    //
    connectionId: function connectionId() {                                                                            // 149
      return true;                                                                                                     // 149
    }                                                                                                                  // 149
  }, 5, 1000);                                                                                                         // 143
}                                                                                                                      // 151
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"regions":{"server":{"publications.js":["meteor/meteor","../regions.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/regions/server/publications.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var Regions;module.import('../regions.js',{"Regions":function(v){Regions=v}});
                                                                                                                       //
                                                                                                                       // 3
                                                                                                                       //
Meteor.publish('regions', function regions() {                                                                         // 5
  return Regions.find({});                                                                                             // 6
});                                                                                                                    // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"methods.js":["meteor/meteor","meteor/mdg:validated-method","meteor/aldeed:simple-schema","meteor/ddp-rate-limiter","meteor/underscore","./regions.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/regions/methods.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({insert:function(){return insert},remove:function(){return remove}});var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var ValidatedMethod;module.import('meteor/mdg:validated-method',{"ValidatedMethod":function(v){ValidatedMethod=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var DDPRateLimiter;module.import('meteor/ddp-rate-limiter',{"DDPRateLimiter":function(v){DDPRateLimiter=v}});var _;module.import('meteor/underscore',{"_":function(v){_=v}});var Regions;module.import('./regions.js',{"Regions":function(v){Regions=v}});
                                                                                                                       // 2
                                                                                                                       // 3
                                                                                                                       // 4
                                                                                                                       // 5
                                                                                                                       //
                                                                                                                       // 7
                                                                                                                       //
var REGION_ID_ONLY = new SimpleSchema({                                                                                // 9
  regionId: Regions.simpleSchema().schema('_id')                                                                       // 10
}).validator({ clean: true, filter: false });                                                                          // 9
                                                                                                                       //
var insert = new ValidatedMethod({                                                                                     // 13
  name: 'regions.insert',                                                                                              // 14
  validate: Regions.simpleSchema().pick(['name']).validator({ clean: true, filter: false }),                           // 15
  run: function run(_ref) {                                                                                            // 16
    var name = _ref.name;                                                                                              // 16
                                                                                                                       //
    return Regions.insert({ name: name, regions: [] });                                                                // 17
  }                                                                                                                    // 18
});                                                                                                                    // 13
                                                                                                                       //
var remove = new ValidatedMethod({                                                                                     // 22
  name: 'regions.remove',                                                                                              // 23
  validate: REGION_ID_ONLY,                                                                                            // 24
  run: function run(_ref2) {                                                                                           // 25
    var regionId = _ref2.regionId;                                                                                     // 25
                                                                                                                       //
                                                                                                                       //
    //TODO checkeditable etc                                                                                           //
                                                                                                                       //
    Regions.remove(regionId);                                                                                          // 29
  }                                                                                                                    // 30
});                                                                                                                    // 22
                                                                                                                       //
var REGIONS_METHODS = _.pluck([insert, remove], 'name');                                                               // 33
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 38
  // Only allow 5 riskmodels operations per connection per second                                                      //
  DDPRateLimiter.addRule({                                                                                             // 40
    name: function name(_name) {                                                                                       // 41
      return _.contains(REGIONS_METHODS, _name);                                                                       // 42
    },                                                                                                                 // 43
                                                                                                                       //
                                                                                                                       //
    //Rate limit per connection ID                                                                                     //
    connectionId: function connectionId() {                                                                            // 46
      return true;                                                                                                     // 46
    }                                                                                                                  // 46
  }, 5, 1000);                                                                                                         // 40
}                                                                                                                      // 49
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"regions.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","meteor/mongo","meteor/aldeed:simple-schema",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/regions/regions.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({Regions:function(){return Regions}});var _classCallCheck;module.import('babel-runtime/helpers/classCallCheck',{"default":function(v){_classCallCheck=v}});var _possibleConstructorReturn;module.import('babel-runtime/helpers/possibleConstructorReturn',{"default":function(v){_possibleConstructorReturn=v}});var _inherits;module.import('babel-runtime/helpers/inherits',{"default":function(v){_inherits=v}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});
                                                                                                                       //
                                                                                                                       //
                                                                                                                       // 1
                                                                                                                       // 2
                                                                                                                       //
var RegionsCollection = function (_Mongo$Collection) {                                                                 //
  _inherits(RegionsCollection, _Mongo$Collection);                                                                     //
                                                                                                                       //
  function RegionsCollection() {                                                                                       //
    _classCallCheck(this, RegionsCollection);                                                                          //
                                                                                                                       //
    return _possibleConstructorReturn(this, _Mongo$Collection.apply(this, arguments));                                 //
  }                                                                                                                    //
                                                                                                                       //
  RegionsCollection.prototype.insert = function insert(region, callback) {                                             //
    return _Mongo$Collection.prototype.insert.call(this, region, callback);                                            // 6
  };                                                                                                                   // 7
                                                                                                                       //
  RegionsCollection.prototype.remove = function remove(selector, callback) {                                           //
    return _Mongo$Collection.prototype.remove.call(this, selector, callback);                                          // 9
  };                                                                                                                   // 10
                                                                                                                       //
  return RegionsCollection;                                                                                            //
}(Mongo.Collection);                                                                                                   //
                                                                                                                       //
var Regions = new RegionsCollection('Regions');                                                                        // 13
                                                                                                                       //
Regions.deny({                                                                                                         // 15
  insert: function insert() {                                                                                          // 16
    return true;                                                                                                       // 16
  },                                                                                                                   // 16
  update: function update() {                                                                                          // 17
    return true;                                                                                                       // 17
  },                                                                                                                   // 17
  remove: function remove() {                                                                                          // 18
    return true;                                                                                                       // 18
  }                                                                                                                    // 18
});                                                                                                                    // 15
                                                                                                                       //
Regions.schema = new SimpleSchema({                                                                                    // 21
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },                                                                 // 22
  name: { type: String }                                                                                               // 23
});                                                                                                                    // 21
                                                                                                                       //
// lat: { type: Number },                                                                                              //
// lng: { type: Number },                                                                                              //
Regions.attachSchema(Regions.schema);                                                                                  // 28
                                                                                                                       //
Regions.publicFields = {                                                                                               // 30
  name: 1                                                                                                              // 31
};                                                                                                                     // 30
                                                                                                                       //
//lat: 1,                                                                                                              //
//lng: 1,                                                                                                              //
Regions.helpers({});                                                                                                   // 36
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"riskmodels":{"server":{"publications.js":["meteor/meteor","../riskmodels.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/riskmodels/server/publications.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var RiskModels;module.import('../riskmodels.js',{"RiskModels":function(v){RiskModels=v}});
                                                                                                                       //
                                                                                                                       // 3
                                                                                                                       //
//Todo public, private                                                                                                 //
Meteor.publish('riskModels', function riskModelsPublic() {                                                             // 6
  return RiskModels.find({});                                                                                          // 7
});                                                                                                                    // 8
                                                                                                                       //
Meteor.publishComposite('riskModelById', function riskModelById(riskModelId) {                                         // 10
  return {                                                                                                             // 11
    find: function find() {                                                                                            // 12
      return RiskModels.find({ _id: riskModelId });                                                                    // 13
    }                                                                                                                  // 14
  };                                                                                                                   // 11
});                                                                                                                    // 16
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"methods.js":["meteor/meteor","meteor/mdg:validated-method","meteor/aldeed:simple-schema","meteor/ddp-rate-limiter","meteor/underscore","./riskmodels.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/riskmodels/methods.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({insert:function(){return insert},addEntry:function(){return addEntry},deleteEntry:function(){return deleteEntry},remove:function(){return remove}});var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var ValidatedMethod;module.import('meteor/mdg:validated-method',{"ValidatedMethod":function(v){ValidatedMethod=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var DDPRateLimiter;module.import('meteor/ddp-rate-limiter',{"DDPRateLimiter":function(v){DDPRateLimiter=v}});var _;module.import('meteor/underscore',{"_":function(v){_=v}});var RiskModels;module.import('./riskmodels.js',{"RiskModels":function(v){RiskModels=v}});
                                                                                                                       // 2
                                                                                                                       // 3
                                                                                                                       // 4
                                                                                                                       // 5
                                                                                                                       //
                                                                                                                       // 7
                                                                                                                       //
var RISKMODEL_ID_ONLY = new SimpleSchema({                                                                             // 9
  riskmodelId: RiskModels.simpleSchema().schema('_id')                                                                 // 10
}).validator({ clean: true, filter: false });                                                                          // 9
                                                                                                                       //
var insert = new ValidatedMethod({                                                                                     // 13
  name: 'riskmodels.insert',                                                                                           // 14
  validate: RiskModels.simpleSchema().pick(['name', 'userId']).validator({ clean: true, filter: false }),              // 15
  run: function run(_ref) {                                                                                            // 16
    var name = _ref.name;                                                                                              // 16
    var userId = _ref.userId;                                                                                          // 16
                                                                                                                       //
    return RiskModels.insert({ name: name, userId: userId, regions: [] });                                             // 17
  }                                                                                                                    // 18
});                                                                                                                    // 13
                                                                                                                       //
var addEntry = new ValidatedMethod({                                                                                   // 21
  name: 'riskmodels.addEntry',                                                                                         // 22
  validate: new SimpleSchema({                                                                                         // 23
    riskmodelId: RiskModels.simpleSchema().schema('_id'),                                                              // 24
    newEntry: { type: RiskModels.entrySchema }                                                                         // 25
  }).validator({ clean: true, filter: false }),                                                                        // 23
  run: function run(_ref2) {                                                                                           // 27
    var riskmodelId = _ref2.riskmodelId;                                                                               // 27
    var newEntry = _ref2.newEntry;                                                                                     // 27
                                                                                                                       //
    RiskModels.update(riskmodelId, {                                                                                   // 28
      $push: { regions: newEntry }                                                                                     // 29
    });                                                                                                                // 28
  }                                                                                                                    // 31
});                                                                                                                    // 21
                                                                                                                       //
var deleteEntry = new ValidatedMethod({                                                                                // 34
  name: 'riskmodels.deleteEntry',                                                                                      // 35
  validate: new SimpleSchema({                                                                                         // 36
    riskmodelId: RiskModels.simpleSchema().schema('_id'),                                                              // 37
    regionId: { type: String }                                                                                         // 38
  }).validator({ clean: true, filter: false }),                                                                        // 36
  run: function run(_ref3) {                                                                                           // 40
    var riskmodelId = _ref3.riskmodelId;                                                                               // 40
    var regionId = _ref3.regionId;                                                                                     // 40
                                                                                                                       //
    RiskModels.update(riskmodelId, {                                                                                   // 41
      $pull: { regions: { regionId: regionId } }                                                                       // 42
    });                                                                                                                // 41
  }                                                                                                                    // 44
});                                                                                                                    // 34
                                                                                                                       //
var remove = new ValidatedMethod({                                                                                     // 47
  name: 'riskmodels.remove',                                                                                           // 48
  validate: RISKMODEL_ID_ONLY,                                                                                         // 49
  run: function run(_ref4) {                                                                                           // 50
    var riskmodelId = _ref4.riskmodelId;                                                                               // 50
                                                                                                                       //
    //TODO checkeditable etc                                                                                           //
    RiskModels.remove(riskmodelId);                                                                                    // 52
  }                                                                                                                    // 53
});                                                                                                                    // 47
                                                                                                                       //
var RISKMODELS_METHODS = _.pluck([insert, addEntry, deleteEntry, remove], 'name');                                     // 56
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 63
  // Only allow 5 riskmodels operations per connection per second                                                      //
  DDPRateLimiter.addRule({                                                                                             // 65
    name: function name(_name) {                                                                                       // 66
      return _.contains(RISKMODELS_METHODS, _name);                                                                    // 67
    },                                                                                                                 // 68
                                                                                                                       //
                                                                                                                       //
    //Rate limit per connection ID                                                                                     //
    connectionId: function connectionId() {                                                                            // 71
      return true;                                                                                                     // 71
    }                                                                                                                  // 71
  }, 5, 1000);                                                                                                         // 65
}                                                                                                                      // 74
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"riskmodels.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","meteor/mongo","meteor/aldeed:simple-schema",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/riskmodels/riskmodels.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({RiskModels:function(){return RiskModels}});var _classCallCheck;module.import('babel-runtime/helpers/classCallCheck',{"default":function(v){_classCallCheck=v}});var _possibleConstructorReturn;module.import('babel-runtime/helpers/possibleConstructorReturn',{"default":function(v){_possibleConstructorReturn=v}});var _inherits;module.import('babel-runtime/helpers/inherits',{"default":function(v){_inherits=v}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});
                                                                                                                       //
                                                                                                                       //
                                                                                                                       // 1
                                                                                                                       // 2
//import { Factory } from 'meteor/factory';                                                                            //
                                                                                                                       //
//TODO import Countries etc                                                                                            //
                                                                                                                       //
var RiskModelsCollection = function (_Mongo$Collection) {                                                              //
  _inherits(RiskModelsCollection, _Mongo$Collection);                                                                  //
                                                                                                                       //
  function RiskModelsCollection() {                                                                                    //
    _classCallCheck(this, RiskModelsCollection);                                                                       //
                                                                                                                       //
    return _possibleConstructorReturn(this, _Mongo$Collection.apply(this, arguments));                                 //
  }                                                                                                                    //
                                                                                                                       //
  RiskModelsCollection.prototype.insert = function insert(riskModel, callback) {                                       //
    // TODO possible to insert custom logic                                                                            //
    return _Mongo$Collection.prototype.insert.call(this, riskModel, callback);                                         // 10
  };                                                                                                                   // 11
                                                                                                                       //
  RiskModelsCollection.prototype.update = function update(selector, callback) {                                        //
    return _Mongo$Collection.prototype.update.call(this, selector, callback);                                          // 14
  };                                                                                                                   // 15
                                                                                                                       //
  RiskModelsCollection.prototype.remove = function remove(selector, callback) {                                        //
    // TODO possible to insert custom logic                                                                            //
    return _Mongo$Collection.prototype.remove.call(this, selector, callback);                                          // 19
  };                                                                                                                   // 20
                                                                                                                       //
  return RiskModelsCollection;                                                                                         //
}(Mongo.Collection);                                                                                                   //
                                                                                                                       //
var RiskModels = new RiskModelsCollection('RiskModels');                                                               // 23
                                                                                                                       //
// Deny all client-side udpates                                                                                        //
RiskModels.deny({                                                                                                      // 26
  insert: function insert() {                                                                                          // 27
    return true;                                                                                                       // 27
  },                                                                                                                   // 27
  update: function update() {                                                                                          // 28
    return true;                                                                                                       // 28
  },                                                                                                                   // 28
  remove: function remove() {                                                                                          // 29
    return true;                                                                                                       // 29
  }                                                                                                                    // 29
});                                                                                                                    // 26
                                                                                                                       //
RiskModels.entrySchema = new SimpleSchema({                                                                            // 32
  regionId: { type: String },                                                                                          // 33
  cl: { type: Number, min: -1, max: 2 },                                                                               // 34
  eo: { type: Number, min: -1, max: 2 },                                                                               // 35
  fa: { type: Number, min: -1, max: 2 },                                                                               // 36
  fl: { type: Number, min: -1, max: 2 },                                                                               // 37
  fs: { type: Number, min: -1, max: 2 },                                                                               // 38
  sb: { type: Number, min: -1, max: 2 },                                                                               // 39
  hs: { type: Number, min: -1, max: 2 },                                                                               // 40
  wh: { type: Number, min: -1, max: 2 }                                                                                // 41
});                                                                                                                    // 32
                                                                                                                       //
RiskModels.schema = new SimpleSchema({                                                                                 // 44
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },                                                                 // 45
  name: { type: String },                                                                                              // 46
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },                                              // 47
  regions: { type: [RiskModels.entrySchema] }                                                                          // 48
});                                                                                                                    // 44
                                                                                                                       //
RiskModels.attachSchema(RiskModels.schema);                                                                            // 51
                                                                                                                       //
RiskModels.publicFields = {                                                                                            // 53
  _id: 1,                                                                                                              // 54
  name: 1,                                                                                                             // 55
  userId: 1,                                                                                                           // 56
  regions: 1                                                                                                           // 57
};                                                                                                                     // 53
                                                                                                                       //
//Factory.define('riskModels', RiskModels, {});                                                                        //
                                                                                                                       //
RiskModels.helpers({                                                                                                   // 62
  // TODO define helpers (e.g. get all countries());                                                                   //
                                                                                                                       //
});                                                                                                                    // 62
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"startup":{"server":{"index.js":["./reset-password-email.js","./register-api.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/server/index.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.import('./reset-password-email.js');module.import('./register-api.js');// starting set of data (if app is loaded with empty db) - TODO
//import './fixtures.js';                                                                                              //
                                                                                                                       //
// configuring Accounts package to define the UI of the reset password email. TODO                                     //
                                                                                                                       // 5
                                                                                                                       //
// Security settings TODO                                                                                              //
//import './security.js';                                                                                              //
                                                                                                                       //
// defining all coellections, publications and methods                                                                 //
                                                                                                                       // 11
                                                                                                                       //
// disable websockets for uberspace                                                                                    //
console.log('disable websockets');                                                                                     // 14
process.env.DISABLE_WEBSOCKETS = 1;                                                                                    // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"register-api.js":["../../api/lcmodels/methods.js","../../api/lcmodels/server/publications.js","../../api/riskmodels/methods.js","../../api/riskmodels/server/publications.js","../../api/comps/methods.js","../../api/comps/server/publications.js","../../api/connects/methods.js","../../api/connects/server/publications.js","../../api/regions/methods.js","../../api/regions/server/publications.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/server/register-api.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.import('../../api/lcmodels/methods.js');module.import('../../api/lcmodels/server/publications.js');module.import('../../api/riskmodels/methods.js');module.import('../../api/riskmodels/server/publications.js');module.import('../../api/comps/methods.js');module.import('../../api/comps/server/publications.js');module.import('../../api/connects/methods.js');module.import('../../api/connects/server/publications.js');module.import('../../api/regions/methods.js');module.import('../../api/regions/server/publications.js');
                                                                                                                       // 2
                                                                                                                       // 3
                                                                                                                       // 4
                                                                                                                       // 5
                                                                                                                       // 6
                                                                                                                       // 7
                                                                                                                       // 8
                                                                                                                       // 9
                                                                                                                       // 10
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"reset-password-email.js":["meteor/accounts-base",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/server/reset-password-email.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Accounts;module.import('meteor/accounts-base',{"Accounts":function(v){Accounts=v}});                               // 1
                                                                                                                       //
Accounts.emailTemplates.siteName = 'Phoenix Tracy';                                                                    // 3
Accounts.emailTemplates.from = 'Phoenix Tracy Accounts <accounts@gotracy.org>';                                        // 4
                                                                                                                       //
Accounts.emailTemplates.resetPassword = {                                                                              // 6
  subject: function subject() {                                                                                        // 7
    return 'Reset your password on Phoenix Tracy';                                                                     // 8
  },                                                                                                                   // 9
  text: function text(user, url) {                                                                                     // 10
    return 'Hello!\n\t\n\tClick the link below to reset your password on Phoenix Tracy.\n  \n  ' + url + '\n\nIf you didn\'t request this email, please ignore it.\n\nThanks,\nThe Phoenix Tracy team\n';
  }                                                                                                                    // 22
};                                                                                                                     // 6
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}},"server":{"main.js":["/imports/startup/server",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.import('/imports/startup/server');                                                                              // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
