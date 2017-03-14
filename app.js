
Items = new Mongo.Collection('items');

if (Meteor.isClient) {

	Meteor.subscribe('items');

	Template.navbar.helpers({
		hideChecked: function() {
			return Session.get('hideChecked');
		}
	})

	Template.shoppingList.helpers({
		items: function() {
			if(Session.get('hideChecked')) {
				return Items.find({checked: {$ne: true}});
			}
			 else {
			 	return Items.find();
			 }
		},
		hideChecked: function() {
			return Session.get("hideChecked");
			//need helper to return session variable value to template so that you can put in if statement. 
			//any data that isn't already avaiable or visible in the template as is, you'll need to return.
		},
		isOwner: function() {
			return this.owner === Meteor.userId();
		}
	});

	Template.navbar.events({
		'click span[data-action="hide-checked"]': function() {
			Session.set("hideChecked",true);
		},
		'click span[data-action="show-checked"]': function(){
			Session.set("hideChecked",false);
		}
	})

	Template.shoppingList.events({
		'click .right-icon': function() {
			Meteor.call('deleteItem', this._id);
		},
		'click .left-icon': function() {
			Meteor.call('updateItem', this._id, !this.checked);
			//Items.update(this._id, {$set:{checked: !this.checked}});
		},
		'mouseenter .item': function(event) {
			//console.log(event)
			$(event.target).children('.right-icon').show();
			$(event.target).children('.left-icon').show();
		},
		'mouseleave .item': function() {
			$('.right-icon').hide();
			$('.left-icon').hide();
		} 
	});

	Template.addItem.events({
		'submit .new-item': function(event) {
			var item = event.target.item.value;
			Meteor.call('addItem', item);

			event.target.item.value = "";
			return false;
		},
		'click #arrow-down': function() {
			$('#needed-list').slideToggle('slow');
		}
	});

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});

}


if(Meteor.isServer) {
	Meteor.publish('items', function() {
		return Items.find();
	})
}

Meteor.methods({
	addItem: function(item) {
		Items.insert({
			item: item,
			createdAt: new Date(),
			owner: Meteor.userId()
		});
	},
	updateItem: function(id, checked) {
		Items.update(id, {$set: {checked: checked}})
	},
	deleteItem: function(id) {
		Items.remove(id);
	}
})




