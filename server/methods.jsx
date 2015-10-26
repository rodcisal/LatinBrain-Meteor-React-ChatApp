Meteor.methods({
	addMessage(message, channelId) {
		check(message, String);
		check(channelId, String);

		Messages.insert({
			content: message,
			channelId: channelId
		});
	}
});