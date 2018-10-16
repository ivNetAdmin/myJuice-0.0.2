import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

//templates
import '/imports/ui/layouts/home/home.js';
import '/imports/ui/layouts/settings/settings.js';

FlowRouter.route('/', {
    action: function(params, queryParams){
        BlazeLayout.render('home');
    },
    // triggersExit: function(){
    //     clearActiveAnchor();
    // },
    // triggersEnter: function(){
    //     setActiveAnchor(FlowRouter.current().path);
    // }
});

FlowRouter.route('/settings', {
    action: function(params, queryParams){
        BlazeLayout.render('settings');
    },
    // triggersExit: function(){
    //     clearActiveAnchor();
    // },
    // triggersEnter: function(){
    //     setActiveAnchor(FlowRouter.current().path);
    // }
});


// function clearActiveAnchor()
// {
//     $('.nav-active').removeClass('nav-active');
// }

// function setActiveAnchor(path)
// {
//     $('li.nav-item').each(function(element){
//         if($(this).find("a").attr("href")===path)
//         {
//             $(this).addClass("active");
//         }
//     });
// }