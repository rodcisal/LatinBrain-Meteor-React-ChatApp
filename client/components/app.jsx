App = React.createClass({
	mixins: [ReactMeteorData],

	getInitialState() {
    return {
      selectedChannel: ''
    };
	},

	setSelectedChannel(channelId) {
		this.setState({
			selectedChannel: channelId
		})
	},

	getMeteorData() {
		let channelsSubscription = Meteor.subscribe( 'channels' );
		let messagesSubscription = Meteor.subscribe( 'messages' );
		return {
			channels: Channels.find({}).fetch(),
			messages: Messages.find({ channelId: this.state.selectedChannel }).fetch(),
			currentUser: Meteor.user()
		}
	},

	render() {
		const channel = Channels.findOne({channelId: this.state.selectedChannel});
		if ( this.data.currentUser ) {
			return (
				<div className="row">
					<div className="container">
						<div className="col-md-4 channel-panel">
							<div className="channels-title"> CHANNELS </div>
							<ul className="clear-ul">
								<ChannelsPanel channels={this.data.channels} onSelectChannel={this.setSelectedChannel}/>
							</ul>
						</div>
						<div className="col-md-8 messages-panel">
							<h3> {channel ? `#${channel.channelName}` : `Pick a Channel`} </h3>
							<MessagesPanel messages={this.data.messages} />
							{ channel ? <MessageForm onSubmitMessage={this.onSubmitMessage} channelId={channel ? channel.channelId : null}/> : null }
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<AccountsUIWrapper />
			)
		}
	}
});



Channel = React.createClass({
	selectChannel() {
		this.props.handleClick(this.props.channel.channelId)
	},
	render() {
		return (
			<li onClick={ this.selectChannel }> #{this.props.channel.channelName} </li>
		);
	}
});

ChannelsPanel = React.createClass({
	renderChannels() {
		return this.props.channels.map((channel) => {
			return <Channel key={channel.channelName} channel={channel} handleClick={this.props.onSelectChannel}/>;
		});
	},

	render() {
		return (
			<ul className="clear-ul"> { this.renderChannels() } </ul>
		)
	}
});



MessagesPanel = React.createClass({

	renderMessages() {
		return this.props.messages.map((message) => {
			return <Message key={message._id} message={message} />
		});
	},

	render() {
		return (
			<ul className="clear-ul"> { this.renderMessages() } </ul>
		)
	}
});


Message = React.createClass({
	render() {
		return (
			<li> <div className="author"> {this.props.message.author}:</div> { this.props.message.content } </li>
		)
	}
});


MessageForm = React.createClass({
	handleSubmit(event) {
		event.preventDefault();
		let text = this.refs.newMessage.getDOMNode().value.trim();
		Meteor.call('addMessage', text, this.props.channelId, Meteor.user().username);
		this.refs.newMessage.getDOMNode().value = '';
	},

	handleKeyDown(event) {
		if ( event.keyCode == 13 ) {
			return this.handleSubmit(event);
		}
	},

	render() {
		return (
			<form className="message-form" onSubmit={this.handleSubmit}>
				<textarea ref="newMessage" placeholder="Type to start chatting" onKeyDown={this.handleKeyDown} />
			</form>
		)
	}
})

AccountsUIWrapper = React.createClass({
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons,
     React.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    Blaze.remove(this.view);
  },
  render() {
    return <span ref="container" />;
  }
});