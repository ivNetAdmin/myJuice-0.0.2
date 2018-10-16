import { Mongo } from 'meteor/mongo';
 
export const Items = new Mongo.Collection("items", {
    transform: function(doc){
        doc.units = doc.units.toFixed(1);
        return doc;
    }
});