/**
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 * @namespace Breeze
 */

Ext.application({
    extend: 'Breeze.Application',

    name: 'Breeze',

    requires: [
        // This will automatically load all classes in the Breeze namespace
        // so that application classes do not need to require each other.
        'Breeze.*'
    ],

    // The name of the initial view to create.
    // mainView: 'Breeze.view.main.Nav',

});
