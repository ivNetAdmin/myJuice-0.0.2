
import { Template } from 'meteor/templating';
import { Items } from '/imports/api/items.js';
import { Units } from '/imports/api/units.js';

import './buttonList.html';
import './buttonList.css';

Template.buttonList.helpers({

    items: function()
    {
      return Items.find();
    },

    unit: function()
    {
      return Units.find();
    },

    unitCount: function()
    {
      return Units.find().count();
    },

    unitToday: function()
    {
        var today = new Date();
        today.setHours(0,0,0,0);
        var units = Units.find({
            "createdAt":{
               $gte: today
            }
        });
        var total = 0;

        units.forEach(element => {
            
            if(!Number.isNaN(element.units))
            {
            total = total + element.units;
            }
        });

        return total.toFixed(1);
    },
  
    unitMonth: function()
    {
        var currentDate = new Date();
        var lastMonth = new Date(currentDate.setMonth(currentDate.getMonth() -1));
      
        var daySpan = (new Date()-lastMonth)/(24 * 60 * 60 * 1000);

       var units = Units.find({
            "createdAt":{
                $gte: new Date((new Date().getTime() - (daySpan * 24 * 60 * 60 * 1000)))
            }
        });
        var total = 0;

        units.forEach(element => {
            
            if(!Number.isNaN(element.units))
            {;
            total = total + element.units;
            }
        });

        var daySpan = (new Date()-lastMonth)/(24 * 60 * 60 * 1000);
        return { ave: (total/daySpan).toFixed(1), total: total.toFixed(1)};
    },
    unit7Day: function()
    {
        var units = Units.find({
            "createdAt":{
                $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
            }
        });
        var total = 0;

        units.forEach(element => {
            
            if(!Number.isNaN(element.units))
            {
            total = total + element.units;
            }
        });

        return { ave: (total/7).toFixed(1), total: total.toFixed(1)};
    },
    unitDaily: function()
    {
        var units = Units.find();

        var count = 0;
        var total = 0;
        var startDate;
        var endDate;

      //  var dict = {};

        units.forEach(element => {
            
            if(!Number.isNaN(element.units))
            {
              //  var name = element.name;

                // if(dict[name]===undefined)
                // {
                //     dict[name]=1;
                // }else{
                //     dict[name]=dict[name]+1;
                // }

                count++;
                total = total + element.units;
            
                if(count==1)
                {
                    startDate = element.createdAt;
                    endDate = element.createdAt;
                }else{
                    if(element.createdAt<startDate) startDate = element.createdAt;
                    if(element.createdAt>endDate) endDate = element.createdAt;
                }
            }
        });

        // var zozo = this.items;

        // Object.keys(dict).forEach(function(key){
        //     var cakes = dict[key];
        //  //   Meteor.Call('addItemPercent',key,function(error,response){});
        // });

        var daySpan = (endDate-startDate)/(24 * 60 * 60 * 1000);
        return {ave: (total/daySpan).toFixed(1)};
    }
  });
  
    Template.buttonList.events({
        'submit .new-unit'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        const target = event.target;
        const item = target.name.value
        const units = parseFloat(target.units.value);

        const total= Units.find().count();

        var items = Items.find();

        items.forEach(element => {
            
            if(!Number.isNaN(element.units))
            {

                const itemCount = Units.find({name: element.name}).count();

                const percent = parseInt((itemCount/total)*100);

                var id = Items.find({name:  element.name}).fetch()[0]._id;

                Items.update(id,{$set: {percent : percent}});
            }
        });

        Units.insert(
            { userId: this._id, 
                name: item, 
                units: units,
                createdAt: new Date()}
        );
        },
      });