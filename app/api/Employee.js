/**
 * API Calls for Employee scope. Extends Breeze.api.Base, providing helper access.
 * Provides access to instances of Employee sub-scoped API classes as well as common methods
 * @class Employee
 * @alias Breeze.api.Employee
 */
Ext.define('Breeze.api.Employee', {
    extend: 'Breeze.api.Base',
    requires: [
        'Breeze.api.employee.Fyi'
    ],

    constructor: function(){
        this.fyi = Ext.create('Breeze.api.employee.Fyi');
        this.information = Ext.create('Breeze.api.employee.Information');
        this.workTimeRecords = Ext.create('Breeze.api.employee.WorkTimeRecords');
    },

    /**
     * TODO: Port homemade.js/getEmpAccess function
     */
    getAccess: function(){

    },

    // References to specific scopes
    fyi: null,
    information: null,
    workTimeRecords: null
});