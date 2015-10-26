Meteor.startup(()=> {
 if ( Channels.find().count() === 0 ) {
	const channels = [
		{channelName: 'Chile', channelId: '1'},
		{channelName: 'Argentina', channelId: '2'},
		{channelName: 'Brazil', channelId: '3'},
	];
	channels.forEach(v => {
		Channels.insert(v)
	});
 }
});