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
	var userId = this.userId;                                                                                             // 15
                                                                                                                       //
	return {                                                                                                              // 17
		find: function find() {                                                                                              // 18
			var query = {                                                                                                       // 19
				_id: lcmodelId                                                                                                     // 20
			};                                                                                                                  // 19
                                                                                                                       //
			var options = {                                                                                                     // 23
				fields: { _id: 1 }                                                                                                 // 24
			};                                                                                                                  // 23
                                                                                                                       //
			return LcModels.find(query, options);                                                                               // 27
		},                                                                                                                   // 28
                                                                                                                       //
                                                                                                                       //
		children: [{                                                                                                         // 30
			find: function find(lcmodel) {                                                                                      // 31
				return Comps.find({ lcmodelId: lcmodel._id }, { fields: Comps.publicFields });                                     // 32
			}                                                                                                                   // 33
		}]                                                                                                                   // 30
	};                                                                                                                    // 17
});                                                                                                                    // 36
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"comps.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","meteor/mongo","meteor/aldeed:simple-schema","../lcmodels/lcmodels.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/comps/comps.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({Comps:function(){return Comps}});var _classCallCheck;module.import('babel-runtime/helpers/classCallCheck',{"default":function(v){_classCallCheck=v}});var _possibleConstructorReturn;module.import('babel-runtime/helpers/possibleConstructorReturn',{"default":function(v){_possibleConstructorReturn=v}});var _inherits;module.import('babel-runtime/helpers/inherits',{"default":function(v){_inherits=v}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var LcModels;module.import('../lcmodels/lcmodels.js',{"LcModels":function(v){LcModels=v}});
                                                                                                                       //
                                                                                                                       //
                                                                                                                       // 1
//import { Factory }                                                                                                   //
//import faker                                                                                                         //
//                                                                                                                     //
                                                                                                                       //
                                                                                                                       // 6
                                                                                                                       // 7
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
    return _Mongo$Collection.prototype.insert.call(this, comp);                                                        // 11
  };                                                                                                                   // 12
                                                                                                                       //
  CompsCollection.prototype.update = function update(selector, modifier) {                                             //
    return _Mongo$Collection.prototype.update.call(this, selector, modifier);                                          // 14
  };                                                                                                                   // 15
                                                                                                                       //
  CompsCollection.prototype.remove = function remove(selector) {                                                       //
    return _Mongo$Collection.prototype.remove.call(this, selector);                                                    // 17
  };                                                                                                                   // 18
                                                                                                                       //
  return CompsCollection;                                                                                              //
}(Mongo.Collection);                                                                                                   //
                                                                                                                       //
var Comps = new CompsCollection('Comps');                                                                              // 21
                                                                                                                       //
Comps.deny({                                                                                                           // 23
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
Comps.schema = new SimpleSchema({                                                                                      // 29
  _id: {                                                                                                               // 30
    type: String,                                                                                                      // 31
    regEx: SimpleSchema.RegEx.Id                                                                                       // 32
  },                                                                                                                   // 30
  lcmodelId: {                                                                                                         // 34
    type: String,                                                                                                      // 35
    regEx: SimpleSchema.RegEx.Id,                                                                                      // 36
    denyUpdate: true                                                                                                   // 37
  },                                                                                                                   // 34
  name: {                                                                                                              // 39
    type: String,                                                                                                      // 40
    max: 100,                                                                                                          // 41
    optional: true                                                                                                     // 42
  },                                                                                                                   // 39
  firmName: {                                                                                                          // 44
    type: String,                                                                                                      // 45
    max: 100,                                                                                                          // 46
    optional: true                                                                                                     // 47
  },                                                                                                                   // 44
  siteLocation: {                                                                                                      // 49
    type: String,                                                                                                      // 50
    max: 100,                                                                                                          // 51
    //TODO no regex to allow empty strings - better idea?                                                              //
    //regEx: SimpleSchema.RegEx.Id,                                                                                    //
    optional: true                                                                                                     // 54
  },                                                                                                                   // 49
  x: {                                                                                                                 // 56
    type: Number                                                                                                       // 57
  },                                                                                                                   // 56
  y: {                                                                                                                 // 59
    type: Number                                                                                                       // 60
  }                                                                                                                    // 59
});                                                                                                                    // 29
                                                                                                                       //
Comps.attachSchema(Comps.schema);                                                                                      // 64
                                                                                                                       //
Comps.publicFields = {                                                                                                 // 66
  lcmodelId: 1,                                                                                                        // 67
  name: 1,                                                                                                             // 68
  firmName: 1,                                                                                                         // 69
  siteLocation: 1,                                                                                                     // 70
  x: 1,                                                                                                                // 71
  y: 1                                                                                                                 // 72
};                                                                                                                     // 66
                                                                                                                       //
Comps.helpers({                                                                                                        // 75
  // for some reasons needed in comps-item.js SimpleSchema -> Comps._helpers                                           //
});                                                                                                                    // 75
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"methods.js":["meteor/meteor","meteor/underscore","meteor/mdg:validated-method","meteor/aldeed:simple-schema","meteor/ddp-rate-limiter","./comps.js","../connects/connects.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/comps/methods.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({insert:function(){return insert},updateInfo:function(){return updateInfo},updatePosition:function(){return updatePosition},remove:function(){return remove}});var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var _;module.import('meteor/underscore',{"_":function(v){_=v}});var ValidatedMethod;module.import('meteor/mdg:validated-method',{"ValidatedMethod":function(v){ValidatedMethod=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var DDPRateLimiter;module.import('meteor/ddp-rate-limiter',{"DDPRateLimiter":function(v){DDPRateLimiter=v}});var Comps;module.import('./comps.js',{"Comps":function(v){Comps=v}});var Connects;module.import('../connects/connects.js',{"Connects":function(v){Connects=v}});
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
			y: y                                                                                                                // 28
		};                                                                                                                   // 22
                                                                                                                       //
		return Comps.insert(comp);                                                                                           // 31
	}                                                                                                                     // 32
});                                                                                                                    // 10
                                                                                                                       //
var updateInfo = new ValidatedMethod({                                                                                 // 35
	name: 'comps.updateInfo',                                                                                             // 36
	validate: new SimpleSchema({                                                                                          // 37
		compId: Comps.simpleSchema().schema('_id'),                                                                          // 38
		name: Comps.simpleSchema().schema('name'),                                                                           // 39
		firmName: Comps.simpleSchema().schema('firmName'),                                                                   // 40
		siteLocation: Comps.simpleSchema().schema('siteLocation')                                                            // 41
	}). //TODO clean set to false to allow for empty strings - any better idea?                                           // 37
	validator({ clean: false, filter: false }),                                                                           // 43
	run: function run(_ref2) {                                                                                            // 44
		var compId = _ref2.compId;                                                                                           // 44
		var name = _ref2.name;                                                                                               // 44
		var firmName = _ref2.firmName;                                                                                       // 44
		var siteLocation = _ref2.siteLocation;                                                                               // 44
                                                                                                                       //
		//TODO validate                                                                                                      //
		console.log("Server: " + siteLocation);                                                                              // 46
		Comps.update(compId, {                                                                                               // 47
			$set: { name: name, firmName: firmName, siteLocation: siteLocation }                                                // 48
		});                                                                                                                  // 47
	}                                                                                                                     // 50
});                                                                                                                    // 35
                                                                                                                       //
var updatePosition = new ValidatedMethod({                                                                             // 53
	name: 'comps.updatePosition',                                                                                         // 54
	validate: new SimpleSchema({                                                                                          // 55
		compId: Comps.simpleSchema().schema('_id'),                                                                          // 56
		newX: Comps.simpleSchema().schema('x'),                                                                              // 57
		newY: Comps.simpleSchema().schema('y')                                                                               // 58
	}).validator({ clean: true, filter: false }),                                                                         // 55
	run: function run(_ref3) {                                                                                            // 60
		var compId = _ref3.compId;                                                                                           // 60
		var newX = _ref3.newX;                                                                                               // 60
		var newY = _ref3.newY;                                                                                               // 60
                                                                                                                       //
		//TODO validate                                                                                                      //
		Comps.update(compId, {                                                                                               // 62
			$set: { x: newX, y: newY }                                                                                          // 63
		});                                                                                                                  // 62
	}                                                                                                                     // 65
});                                                                                                                    // 53
                                                                                                                       //
var remove = new ValidatedMethod({                                                                                     // 68
	name: 'comps.remove',                                                                                                 // 69
	validate: new SimpleSchema({ compId: Comps.simpleSchema().schema('_id') }).validator({ clean: true, filter: false }),
	run: function run(_ref4) {                                                                                            // 71
		var compId = _ref4.compId;                                                                                           // 71
                                                                                                                       //
		//TODO sanity checks                                                                                                 //
		Connects.remove({ $or: [{ parentCompId: compId }, { childCompId: compId }] });                                       // 73
		Comps.remove(compId);                                                                                                // 74
	}                                                                                                                     // 75
});                                                                                                                    // 68
                                                                                                                       //
var COMPS_METHODS = _.pluck([insert, updateInfo, updatePosition, remove], 'name');                                     // 78
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 85
	DDPRateLimiter.addRule({                                                                                              // 86
		name: function name(_name) {                                                                                         // 87
			return _.contains(COMPS_METHODS, _name);                                                                            // 88
		},                                                                                                                   // 89
		connectionId: function connectionId() {                                                                              // 90
			return true;                                                                                                        // 90
		}                                                                                                                    // 90
	}, 5, 1000);                                                                                                          // 86
}                                                                                                                      // 92
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
  }                                                                                                                    // 36
});                                                                                                                    // 23
                                                                                                                       //
Connects.attachSchema(Connects.schema);                                                                                // 42
                                                                                                                       //
Connects.publicFields = {                                                                                              // 44
  lcmodelId: 1,                                                                                                        // 45
  parentCompId: 1,                                                                                                     // 46
  childCompId: 1                                                                                                       // 47
};                                                                                                                     // 44
                                                                                                                       //
Connects.helpers({                                                                                                     // 50
  parent: function parent() {                                                                                          // 51
    return Comps.findOne({ _id: this.parentCompId });                                                                  // 52
  },                                                                                                                   // 53
  child: function child() {                                                                                            // 54
    return Comps.findOne({ _id: this.childCompId });                                                                   // 55
  }                                                                                                                    // 56
});                                                                                                                    // 50
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
      childCompId: childCompId                                                                                         // 17
    };                                                                                                                 // 14
                                                                                                                       //
    Connects.insert(connect);                                                                                          // 20
  }                                                                                                                    // 21
});                                                                                                                    // 10
                                                                                                                       //
var disconnect = new ValidatedMethod({                                                                                 // 24
  name: 'connects.disconnect',                                                                                         // 25
  validate: new SimpleSchema({ connectId: Connects.simpleSchema().schema('_id') }).validator({ clean: true, filter: false }),
  run: function run(_ref2) {                                                                                           // 27
    var connectId = _ref2.connectId;                                                                                   // 27
                                                                                                                       //
    Connects.remove(connectId);                                                                                        // 28
  }                                                                                                                    // 29
});                                                                                                                    // 24
                                                                                                                       //
var CONNECTS_METHODS = _.pluck([connect, disconnect], 'name');                                                         // 32
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 37
  DDPRateLimiter.addRule({                                                                                             // 38
    name: function name(_name) {                                                                                       // 39
      return _.contains(CONNECTS_METHODS, _name);                                                                      // 40
    },                                                                                                                 // 41
    connectionId: function connectionId() {                                                                            // 42
      return true;                                                                                                     // 42
    }                                                                                                                  // 42
  }, 5, 1000);                                                                                                         // 38
}                                                                                                                      // 44
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"lcmodels":{"server":{"publications.js":["meteor/meteor","../lcmodels.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/lcmodels/server/publications.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var LcModels;module.import('../lcmodels.js',{"LcModels":function(v){LcModels=v}});
                                                                                                                       //
                                                                                                                       // 3
                                                                                                                       //
Meteor.publish('lcmodels', function lcmodelsPublic() {                                                                 // 5
	return LcModels.find({}, {                                                                                            // 6
		fields: LcModels.publicFields                                                                                        // 8
	});                                                                                                                   // 7
});                                                                                                                    // 10
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

}]},"lcmodels.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","meteor/mongo","meteor/aldeed:simple-schema","../comps/comps.js","../connects/connects.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/lcmodels/lcmodels.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({LcModels:function(){return LcModels}});var _classCallCheck;module.import('babel-runtime/helpers/classCallCheck',{"default":function(v){_classCallCheck=v}});var _possibleConstructorReturn;module.import('babel-runtime/helpers/possibleConstructorReturn',{"default":function(v){_possibleConstructorReturn=v}});var _inherits;module.import('babel-runtime/helpers/inherits',{"default":function(v){_inherits=v}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var Comps;module.import('../comps/comps.js',{"Comps":function(v){Comps=v}});var Connects;module.import('../connects/connects.js',{"Connects":function(v){Connects=v}});
                                                                                                                       //
                                                                                                                       //
                                                                                                                       // 1
                                                                                                                       // 2
//import { Factory } from 'meteor/factory';                                                                            //
//                                                                                                                     //
                                                                                                                       // 5
                                                                                                                       // 6
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
    return _Mongo$Collection.prototype.insert.call(this, lcmodel, callback);                                           // 11
  };                                                                                                                   // 12
                                                                                                                       //
  LcModelsCollection.prototype.remove = function remove(selector, callback) {                                          //
    // TODO  remove components etc                                                                                     //
    return _Mongo$Collection.prototype.remove.call(this, selector, callback);                                          // 15
  };                                                                                                                   // 16
                                                                                                                       //
  return LcModelsCollection;                                                                                           //
}(Mongo.Collection);                                                                                                   //
                                                                                                                       //
var LcModels = new LcModelsCollection('LcModels');                                                                     // 19
                                                                                                                       //
// Deny all client-side updates since we will be using methods to manage this collection                               //
LcModels.deny({                                                                                                        // 22
  insert: function insert() {                                                                                          // 23
    return true;                                                                                                       // 23
  },                                                                                                                   // 23
  update: function update() {                                                                                          // 24
    return true;                                                                                                       // 24
  },                                                                                                                   // 24
  remove: function remove() {                                                                                          // 25
    return true;                                                                                                       // 25
  }                                                                                                                    // 25
});                                                                                                                    // 22
                                                                                                                       //
LcModels.schema = new SimpleSchema({                                                                                   // 28
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },                                                                 // 29
  name: { type: String },                                                                                              // 30
  riskModelId: { type: String, regEx: SimpleSchema.RegEx.Id },                                                         // 31
  userId: { type: String, regEx: SimpleSchema.RegEx.Id }                                                               // 32
});                                                                                                                    // 28
                                                                                                                       //
LcModels.attachSchema(LcModels.schema);                                                                                // 35
                                                                                                                       //
// This represents the keys from objects that should be published                                                      //
// to the client. If we add secret properties to objects, don't list                                                   //
// them here to keep them private to the server.                                                                       //
LcModels.publicFields = {                                                                                              // 40
  name: 1,                                                                                                             // 41
  riskModelId: 1,                                                                                                      // 42
  userId: 1                                                                                                            // 43
};                                                                                                                     // 40
                                                                                                                       //
//Factory.define('list', Lists, {});                                                                                   //
                                                                                                                       //
LcModels.helpers({                                                                                                     // 48
  // A list is considered to be private if it has a userId set                                                         //
  //  isPrivate() {                                                                                                    //
  //	return !!this.userId;                                                                                             //
  //  },                                                                                                               //
  //  isLastPublicList() {                                                                                             //
  //	const publicListCount = Lists.find({ userId: { $exists: false } }).count();                                       //
  //	return !this.isPrivate() && publicListCount === 1;                                                                //
  //  },                                                                                                               //
  //  editableBy(userId) {                                                                                             //
  //	if (!this.userId) {                                                                                               //
  //	  return true;                                                                                                    //
  //	}                                                                                                                 //
  //                                                                                                                   //
  //	return this.userId === userId;                                                                                    //
  //  },                                                                                                               //
                                                                                                                       //
  comps: function comps() {                                                                                            // 65
    return Comps.find({ lcmodelId: this._id });                                                                        // 66
  },                                                                                                                   // 67
  connects: function connects() {                                                                                      // 68
    return Connects.find({ lcmodelId: this._id });                                                                     // 69
  }                                                                                                                    // 70
});                                                                                                                    // 48
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
  lcmodelId: LcModels.simpleSchema().schema('_id')                                                                     // 11
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
    var initialComp = {                                                                                                // 20
      lcmodelId: lcmodelId,                                                                                            // 21
      name: name,                                                                                                      // 22
      firmName: 'unknown',                                                                                             // 23
      siteLocation: 'unknown',                                                                                         // 24
      x: 0,                                                                                                            // 25
      y: 0                                                                                                             // 26
    };                                                                                                                 // 20
    Comps.insert(initialComp);                                                                                         // 28
                                                                                                                       //
    return lcmodelId;                                                                                                  // 30
  }                                                                                                                    // 31
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
var remove = new ValidatedMethod({                                                                                     // 103
  name: 'lcmodels.remove',                                                                                             // 104
  validate: LCMODEL_ID_ONLY,                                                                                           // 105
  run: function run(_ref2) {                                                                                           // 106
    var lcmodelId = _ref2.lcmodelId;                                                                                   // 106
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
    LcModels.remove(lcmodelId);                                                                                        // 122
  }                                                                                                                    // 123
});                                                                                                                    // 103
                                                                                                                       //
// Get list of all method names on Lists                                                                               //
var LISTS_METHODS = _.pluck([insert, remove], 'name');                                                                 // 127
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 132
  // Only allow 5 list operations per connection per second                                                            //
  DDPRateLimiter.addRule({                                                                                             // 134
    name: function name(_name) {                                                                                       // 135
      return _.contains(LISTS_METHODS, _name);                                                                         // 136
    },                                                                                                                 // 137
                                                                                                                       //
                                                                                                                       //
    // Rate limit per connection ID                                                                                    //
    connectionId: function connectionId() {                                                                            // 140
      return true;                                                                                                     // 140
    }                                                                                                                  // 140
  }, 5, 1000);                                                                                                         // 134
}                                                                                                                      // 142
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
Meteor.publish('riskmodels.public', function riskModelsPublic() {                                                      // 6
  return RiskModels.find({                                                                                             // 7
    userId: { $exists: false }                                                                                         // 8
  }, {                                                                                                                 // 7
    fields: RiskModels.publicFields                                                                                    // 10
  });                                                                                                                  // 9
});                                                                                                                    // 12
                                                                                                                       //
Meteor.publish('riskmodels.private', function lcmodelsPrivate() {                                                      // 14
  if (!this.userId) {                                                                                                  // 15
    return this.ready();                                                                                               // 16
  }                                                                                                                    // 17
                                                                                                                       //
  return RiskModels.find({                                                                                             // 19
    userId: this.userId                                                                                                // 20
  }, {                                                                                                                 // 19
    fields: RiskModels.publicFields                                                                                    // 22
  });                                                                                                                  // 21
});                                                                                                                    // 24
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"methods.js":["meteor/meteor","meteor/mdg:validated-method","meteor/aldeed:simple-schema","meteor/ddp-rate-limiter","meteor/underscore","./riskmodels.js","../regions/regions.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/riskmodels/methods.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({insert:function(){return insert},addEntry:function(){return addEntry},deleteEntry:function(){return deleteEntry},remove:function(){return remove}});var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var ValidatedMethod;module.import('meteor/mdg:validated-method',{"ValidatedMethod":function(v){ValidatedMethod=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var DDPRateLimiter;module.import('meteor/ddp-rate-limiter',{"DDPRateLimiter":function(v){DDPRateLimiter=v}});var _;module.import('meteor/underscore',{"_":function(v){_=v}});var RiskModels;module.import('./riskmodels.js',{"RiskModels":function(v){RiskModels=v}});var Regions;module.import('../regions/regions.js',{"Regions":function(v){Regions=v}});
                                                                                                                       // 2
                                                                                                                       // 3
                                                                                                                       // 4
                                                                                                                       // 5
                                                                                                                       //
                                                                                                                       // 7
                                                                                                                       // 8
                                                                                                                       //
var RISKMODEL_ID_ONLY = new SimpleSchema({                                                                             // 10
  riskmodelId: RiskModels.simpleSchema().schema('_id')                                                                 // 11
}).validator({ clean: true, filter: false });                                                                          // 10
                                                                                                                       //
var insert = new ValidatedMethod({                                                                                     // 14
  name: 'riskmodels.insert',                                                                                           // 15
  validate: RiskModels.simpleSchema().pick(['name', 'userId']).validator({ clean: true, filter: false }),              // 16
  run: function run(_ref) {                                                                                            // 17
    var name = _ref.name;                                                                                              // 17
    var userId = _ref.userId;                                                                                          // 17
                                                                                                                       //
    return RiskModels.insert({ name: name, userId: userId, regions: [] });                                             // 18
  }                                                                                                                    // 19
});                                                                                                                    // 14
                                                                                                                       //
var addEntry = new ValidatedMethod({                                                                                   // 22
  name: 'riskmodels.addEntry',                                                                                         // 23
  validate: new SimpleSchema({                                                                                         // 24
    riskmodelId: RiskModels.simpleSchema().schema('_id'),                                                              // 25
    newEntry: { type: RiskModels.entrySchema }                                                                         // 26
  }).validator({ clean: true, filter: false }),                                                                        // 24
  run: function run(_ref2) {                                                                                           // 28
    var riskmodelId = _ref2.riskmodelId;                                                                               // 28
    var newEntry = _ref2.newEntry;                                                                                     // 28
                                                                                                                       //
    RiskModels.update(riskmodelId, {                                                                                   // 29
      $push: { regions: newEntry }                                                                                     // 30
    });                                                                                                                // 29
  }                                                                                                                    // 32
});                                                                                                                    // 22
                                                                                                                       //
var deleteEntry = new ValidatedMethod({                                                                                // 35
  name: 'riskmodels.deleteEntry',                                                                                      // 36
  validate: new SimpleSchema({                                                                                         // 37
    riskmodelId: RiskModels.simpleSchema().schema('_id'),                                                              // 38
    regionId: Regions.simpleSchema().schema('_id')                                                                     // 39
  }).validator({ clean: true, filter: false }),                                                                        // 37
  run: function run(_ref3) {                                                                                           // 41
    var riskmodelId = _ref3.riskmodelId;                                                                               // 41
    var regionId = _ref3.regionId;                                                                                     // 41
                                                                                                                       //
    RiskModels.update(riskmodelId, {                                                                                   // 42
      $pull: { regions: { regionId: regionId } }                                                                       // 43
    });                                                                                                                // 42
  }                                                                                                                    // 45
});                                                                                                                    // 35
                                                                                                                       //
var remove = new ValidatedMethod({                                                                                     // 48
  name: 'riskmodels.remove',                                                                                           // 49
  validate: RISKMODEL_ID_ONLY,                                                                                         // 50
  run: function run(_ref4) {                                                                                           // 51
    var riskmodelId = _ref4.riskmodelId;                                                                               // 51
                                                                                                                       //
    //TODO checkeditable etc                                                                                           //
    RiskModels.remove(riskmodelId);                                                                                    // 53
  }                                                                                                                    // 54
});                                                                                                                    // 48
                                                                                                                       //
var RISKMODELS_METHODS = _.pluck([insert, addEntry, deleteEntry, remove], 'name');                                     // 57
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 64
  // Only allow 5 riskmodels operations per connection per second                                                      //
  DDPRateLimiter.addRule({                                                                                             // 66
    name: function name(_name) {                                                                                       // 67
      return _.contains(RISKMODELS_METHODS, _name);                                                                    // 68
    },                                                                                                                 // 69
                                                                                                                       //
                                                                                                                       //
    //Rate limit per connection ID                                                                                     //
    connectionId: function connectionId() {                                                                            // 72
      return true;                                                                                                     // 72
    }                                                                                                                  // 72
  }, 5, 1000);                                                                                                         // 66
}                                                                                                                      // 75
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
  regionId: { type: String, regEx: SimpleSchema.RegEx.Id },                                                            // 33
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
