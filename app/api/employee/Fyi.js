Ext.define('Breeze.api.employee.Fyi', {
    extend: 'Breeze.api.Base',
    requires: ['Breeze.helper.Api'],

    /**
        * getFYI API Call (ported from old FYI view)
        * @param {String} employeeId Employee ID
        * @param {Number} year Recorded year
        * @param {String} day Active day (m/d/y)
        * @param {Boolean} scheduled Whether to limit to scheduled FYI
        * @param {String} storeID ID of store to put results in
        * @return {Promise} promise resolving to object with fields and store,
        *      or rejecting with error
        */
    getFYI: function (employeeId, year, day, scheduled, storeId) {
        var scheduled = defVal(scheduled, false);
        var storeId = defVal(storeId, 'employee_fyi');
        var year = defVal(year, (new Date()).getFullYear());
        var api = Breeze.helper.Api;
        return new Promise(function (resolve, reject) {
            api.serviceRequest(
                'getFYI',
                {
                    'employee_id': employeeId,
                    'recyear': year,
                    'activeDay': day,
                    'showScheduled': scheduled
                },
                false,
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