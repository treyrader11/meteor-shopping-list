Items = new Mongo.Collection('items');

if (Meteor.isClient) {
	Template.body.helpers({
		items: function() {
			return Items.find();
			//console.log(Items.find());
		}
	});

	Template.addItem.events({
		'submit .new-item': function(event) {
			var item = event.target.title.value;
			console.log(item);
			Items.insert({
				item: "dummy-data",
				createdAt: new Date()
			});

			event.target.title.value = "";
			return false;
		},
		'click #arrow-down': function(event) {
			$('#needed-list').slideToggle('slow');
		}
	})
}

if(Meteor.isServer) {

}