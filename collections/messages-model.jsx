Messages = new Mongo.Collection("messages", {
	transform: function (doc) {
		doc.authorName = function () {
			if ( Meteor.users.findOne(doc.userId) ) {
				return Meteor.users.findOne(doc.userId).username;
			}
		};
		return doc;
	}
});