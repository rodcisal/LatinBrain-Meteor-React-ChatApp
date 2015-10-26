Meteor.methods({
	addMessage(message, channelId, userId) {
		check(message, String);
		check(channelId, String);
		check(userId, String);

		Messages.insert({
			content: message,
			channelId: channelId,
			userId: userId
		});
	}
});