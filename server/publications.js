Meteor.publish('channels', () => {
	return Channels.find({});
});


Meteor.publish('messages', () => {
	return Messages.find({});
});
