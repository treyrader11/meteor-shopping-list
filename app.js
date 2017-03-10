if (Meteor.isClient) {
	Template.body.helpers({
		items: [
			{item: "Oranges"}
		]
	});
}

if(Meteor.isServer) {
	
}