/**
 * View Controller for Punch Errors Admin view
 * @class PunchErrorsController
 * @namespace Breeze.view.admin.ProjectsController
 * @alias controller.admin.projects
 */
Ext.define('Breeze.view.admin.PunchErrorsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.puncherrors',

    requires: [
        'Breeze.api.admin.PunchErrors',
        'Breeze.mixin.CommonToolable'
    ],

    mixins: {
        commonToolable: 'Breeze.mixin.CommonToolable'
    },

    config: {
        injectTools: true
    },

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        this.api = Ext.create('Breeze.api.admin.PunchErrors');

    },





});