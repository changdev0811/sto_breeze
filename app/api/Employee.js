Ext.define('Breeze.api.Employee', {
    extend: 'Breeze.api.Base',
    requires: [
        'Breeze.api.employee.Fyi'
    ],

    
    // References to specific scopes

    fyi: Ext.create('Breeze.api.employee.Fyi'),
    information: Ext.create('Breeze.api.employee.Information')

});