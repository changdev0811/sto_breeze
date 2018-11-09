/**
 * Store used for resolving admin views based on their url route params
 * 
 * @class Routes
 * @namespace Breeze.store.admin.Routes
 */
Ext.define('Breeze.store.admin.Routes', {
    extend: 'Breeze.store.Base',
    autoLoad: true,

    // Fields for store-- not backed by model
    fields: [
        { name: 'type', type: 'string' },
        { name: 'view', type: 'string' }
    ],

    /**
     * Route data goes here
     * action: url part
     * view: handling view
     * method: true indicates response is function call, not route
     */
    data: [
        {
            type: "accrualpolicies",
            view: "Breeze.view.admin.AccrualPolicies"
        },
        {
            type: "companyhistory",
            view: "Breeze.view.admin.CompanyHistory"
        },
        {
            type: "departments",
            view: "Breeze.view.admin.Departments"
        },
        {
            type: "holidayeditor",
            view: "Breeze.view.admin.HolidayEditor"
        },
        {
            type: "motd",
            view: "Breeze.view.admin.MOTD"
        },
        {
            type: "pointcats",
            view: "Breeze.view.admin.PointCats"
        },
        {
            type: "projects",
            view: "Breeze.view.admin.Projects"
        },
        {
            type: "puncherrors",
            view: "Breeze.view.admin.PunchErrors"
        },
        {
            type: "punchpolicies",
            view: "Breeze.view.admin.PunchPolicies"
        },
        {
            type: "stimessage",
            view: "Breeze.view.admin.STIMessage"
        },
        {
            type: "restoreemployee",
            view: "Breeze.view.admin.RestoreEmployee"
        },
        {
            type: "saoptions",
            view: "Breeze.view.admin.SAOptions"
        },
        {
            type: "roles",
            view: "Breeze.view.admin.Roles"
        },
        {
            type: "udc",
            view: "Breeze.view.admin.UDC"
        }
    ],

    /**
     * Resolve route info by Action name
     * @param {String} type Name of type
     * @return {String} View namespace
     */
    resolve: function (type) {
        var idx = this.find('type', type.toLowerCase());
        if (idx !== -1) {
            var rec = this.getAt(idx).data,
                info = rec.view
            return info;
        } else {
            return null;
        }
    }
});