/**
 * Store used for resolving employees employee views based on their url route params
 * 
 * @class Routes
 * @namespace Breeze.store.employees.Routes
 */
Ext.define('Breeze.store.employees.Routes', {
    extend: 'Breeze.store.Base',
    autoLoad: true,

    // Fields for store-- not backed by model
    fields: [
        { name: 'action', type: 'string' },
        { name: 'view', type: 'string' },
        { name: 'method', type: 'boolean'}
    ],

    /**
     * Route data goes here
     * action: url part
     * view: handling view
     * method: true indicates response is function call, not route
     */
    data: [
        {
            action: 'cal', view: 'Breeze.view.employee.Calendar', 
            method: false
        },
        {
            action: 'empinfo', view: 'Breeze.view.employee.Information', 
            method: false
        },
        {
            action: 'fyi', view: 'Breeze.view.employee.Fyi', 
            method: false
        },
        {
            action: 'yag', view: '', 
            method: true
        },
        {
            action: 'wtv', view: 'Breeze.view.employee.WorkTimeRecords',
            method: false
        }
    ],

    /**
     * Resolve route info by Action name
     * @param {String} action Name of action
     * @return {Object} Object with view and method
     */
    resolve: function (action) {
        var idx = this.find('action', action.toLowerCase());
        if (idx !== -1) {
            var rec = this.getAt(idx).data,
                {view, method} = rec,
                info = {view, method}; 
            return info;
        } else {
            return null;
        }
    }
});