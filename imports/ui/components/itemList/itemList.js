import { Template } from 'meteor/templating';
import { Items } from '/imports/api/items.js';

import './itemList.html';

Template.itemList.helpers({
  item: function()
  {
    var items = Items.find();
    return items;
  }
});

Template.itemList.events({   
    'click .delete'() {
        Items.remove(this._id);
    },
  });