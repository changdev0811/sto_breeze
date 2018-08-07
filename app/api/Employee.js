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

    // References to specific scopes
    fyi: null,
    information: null,
    workTimeRecords: null,

    // Class API methods

    /**
     * Get employee access level
     * (Port homemade.js/getEmpAccessLogin function)
     * @return {Promise} promise resolving to numerical access level, or rejecting with error
     */
    getAccess: function(){
        var auth = this.auth;
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest('getAccess', 
                {},
                function(res, req){
                    resolve(api.decodeJsonResponse(res).level);
                },
                function(err){
                    reject(err);
                }
            );
        });
    }
});