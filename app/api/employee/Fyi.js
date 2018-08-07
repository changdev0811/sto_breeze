/**
 * API calls for Employee sub-scope FYI. Extends Breeze.api.Base, providing access to helpers.
 * Should be accessed indirectly through Breeze.api.Employee
 * @class Fyi
 * @alias Breeze.api.employee.Fyi
 */
Ext.define('Breeze.api.employee.Fyi', {
    extend: 'Breeze.api.Base',
    requires: ['Breeze.helper.Api'],

    /**
        * getFYI API Call (ported from old FYI view)
        * @todo TODO: Consider relocating ajax logic to reside inside a store
        * @param {String} employeeId Employee ID
        * @param {Number} year Recorded year
        * @param {String} day Active day (m/d/y)
        * @param {Boolean} scheduled Whether to limit to scheduled FYI
        * @param {String} storeID ID of store to put results in
        * @return {Promise} promise resolving to object with fields and store,
        *      or rejecting with error
        */
    getFYI: function (employeeId, year, day, scheduled, storeId) {
        var authInfo = this.auth.getCookies();
        var employeeId = this.defVal(employeeId, authInfo.emp);
        var scheduled = this.defVal(scheduled, false);
        var storeId = this.defVal(storeId, 'employee_fyi');
        var year = this.defVal(year, (new Date()).getFullYear());
        var api = this.api;
        return new Promise(function (resolve, reject) {
            api.serviceRequest(
                'getFYI',
                {
                    'employee_id': employeeId,
                    'recyear': year,
                    'activeDay': day,
                    'showScheduled': scheduled
                },
                true,
                function (response) {
                    var respJson = api.decodeJsonResponse(response);
                    var store = Ext.create(
                        'Ext.data.Store', {
                            autoLoad: true,
                            model: 'Breeze.model.employee.Fyi',
                            id: storeId,
                            data: respJson.Rows,
                            proxy: {
                                type: 'memory',
                                reader: {
                                    type: 'json'
                                }
                            }
                        }
                    );
                    var result = {
                        store: store,
                        data: {
                            employeeName: respJson.EmployeeName,
                            departmentName: respJson.DepartmentName,
                            hireDate: respJson.HireDate,
                            points: respJson.Points
                        }
                    };
                    resolve(result);
                },
                function (response) {
                    reject(response);
                }
            );
        });
    }
});