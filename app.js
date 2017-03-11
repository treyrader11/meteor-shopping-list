Items = new Mongo.Collection('items');

if (Meteor.isClient) {
	Template.body.helpers({
		getItems: function() {
			return Items.find();
		}
	});

	Template.addItem.events({
		'submit .new-item': function(event) {
			var item = event.target.title.value;
			console.log(item);
			Items.insert({
				item: item,
				createdAt: new Date()
			});

			return false;
		}
	})
}

if(Meteor.isServer) {

}