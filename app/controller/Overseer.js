/**
 * 'Overseeing' application controller. Responsible for checking whether
 * user is logged in / authorized before rendering, and (possibly) 
 * lists used models, stores and views.
 * 
 * @namespace Breeze.controller
 * @alias Breeze.controller.Overseer 
 * @class Overseer
 * @author wvh
*/
 
Ext.define('Breeze.controller.Overseer', {
    extend: 'Ext.app.Controller',

    requires: [
        'Breeze.helper.Auth'
    ],

    views: [
        'Breeze.view.main.Nav',
        'Breeze.view.auth.Login'
    ],

/*
    models: [],
    stores: [],

    init: function() {

    },
    
    init: function () {
       this.control({
           'viewport': {
               render: this.onViewportRendered
            }
        });
    },

    onViewportRendered: function(params){
        // Check if user is logged in, handle both possibilities
        console.log("Overseer viewport rendered.");
    },
*/

});
