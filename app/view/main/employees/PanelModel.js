/**
 * ViewModel for Employees Panel view
 * @class PanelModel
 * @namespace Breeze.view.main.employees.PanelModel
 * @alias viewmodel.main.employees.panel
 */
Ext.define('Breeze.view.main.employees.PanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main.employees.panel',
    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:
        users: {
            model: 'User',
            autoLoad: true
        }
        */
    },
    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
        
        // 'Exclude Terminated' panel parameter
        excludeTerminated: false,
        
        permissions: {
            // TODO: update perms to false by default
            canAdd: true,
            canRemove: true
        },

        // 'Type' of view to show when selecting employee node
        defaultEmployeeAction: 'Cal',

        // Employee counts
        counts: {
            active: 0,
            terminated: 0,
            deleted: 0
        }
    }
});