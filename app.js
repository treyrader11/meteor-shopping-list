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
			//var item = event.target.text.value;
			var item = $('.new-item').val();
			console.log(item);
			Items.insert({
				item: item,
				createdAt: new Date()
			});

			//event.target.text.value = "";
			return false;
		},
		'click #arrow-down': function() {
			$('#needed-list').slideToggle('slow');
		}
	})

	Template.item.events({
		'click .right-icon': function() {
			Items.remove(this._id);
		},
		'click .left-icon': function() {
			Items.update(this._id, {$set:{checked: !this.checked}});
		},
		'mouseenter .item': function(event) {
			$('.right-icon').show();
			$('.left-icon').show();
			//console.log(Items.findOne(this._id));
		},
		'mouseleave .item': function() {
			$('.right-icon').hide();
			$('.left-icon').hide();
		}
	})

}


if(Meteor.isServer) {

}