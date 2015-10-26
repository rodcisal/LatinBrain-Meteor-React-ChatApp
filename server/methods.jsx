Meteor.methods({
	addMessage(message, channelId, author) {
		check(message, String);
		check(channelId, String);
		check(author, String);

		Messages.insert({
			content: message,
			channelId: channelId,
			author: author
		});
	}
});