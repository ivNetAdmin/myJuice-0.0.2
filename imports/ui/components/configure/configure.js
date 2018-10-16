import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Items } from '/imports/api/items.js';

import './configure.html';

  Template.configure.events({
    'submit .new-item'(event) {
      // Prevent default browser form submit
      event.preventDefault();

      const target = event.target;
      const item = target.item.value;
      const units = parseFloat(target.units.value);

     if(item.length>0 && units>0)
      {
        Items.insert(
          { userId: this._id, name: item, units: units, percent: 0, 
            createdAt: new Date()}
        );
      }
   
      // Clear form
      target.item.value = '';
      target.units.value = '';
    },
  });