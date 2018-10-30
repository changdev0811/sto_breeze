/**
 * Store for loading employee specific security role rights
 * @class SecRights
 * @namespace Breeze.store.employee.SecRights
 */
Ext.define('Breeze.store.employee.SecRights', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.company.SecurityRole',
    alias: 'store.employee.secrights',
    autoLoad: false,
    config: {
        employeeId: null
    },
    listeners: {
        beforeload: function () {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            if(this.getEmployeeId() !== null){
                this.addExtraParams({employee_id: this.getEmployeeId()});
            }
        }
    },
    proxy: {
        type: 'ajax',
        url: Breeze.helper.Store.api.url('getSecRightsForEmployee'),
        headers: { 'Content-Type': 'application/json;' },
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'd'
        },
        // Don't want proxy to include these params in request
        pageParam: undefined,
        startParam: undefined
    }
});