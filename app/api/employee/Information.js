/**
 * API calls for Employee sub-scope Information. 
 * Extends Breeze.api.Base, providing access to helpers.
 * Should be accessed indirectly through Breeze.api.Employee
 * @class Information
 * @alias Breeze.api.employee.Information
 */
Ext.define('Breeze.api.employee.Information', {
    extend: 'Breeze.api.Base',

    /**
     * Gets employee info
     * @api getEmployeeInfo
     * @param {String} employeeId ID of employee
     * @param {String} storeId name of store to load into
     */
    getEmployeeInfo: function (employeeId, storeId) {
        var authInfo = this.auth.getCookies();
        var employeeId = this.defVal(employeeId, authInfo.emp);
        var storeId = this.defVal(storeId, 'employee_info');
        var api = this.api;
        return new Promise(function (resolve, reject) {
            api.serviceRequest(
                'getEmployeeInfo',
                {
                    'employee_id': employeeId
                },
                true,
                true,
                function (response) {
                    var respJson = api.decodeJsonResponse(response);
                    // var store = Ext.create(
                    //     'Ext.data.Store', {
                    //         model: 'Breeze.model.employee.Information',
                    //         id: storeId,
                    //         data: [respJson.employee],
                    //         proxy: {
                    //             type: 'memory',
                    //             reader: {
                    //                 type: 'json'
                    //             }
                    //         }
                    //     }
                    // );
                    // var store = Ext.create(
                    //     'Breeze.model.employee.Information',
                    //     { data: respJson.Employee }
                    // );
                    resolve({
                        employee: respJson.employee,
                        punchPolicy: respJson.punchPolicy
                    });
                },
                function (response) {
                    reject(response);
                }
            )
        });
    },

    /**
     * Get current employee info
     * @api getCurrentEmployeeInfo
     * @param {boolean} resolveDefaultProject If true, make secondary ajax
     *  call to getProjectByID if response's DefaultProject isn't null 
     *  (default true)
     * @return {Promise} Promise resolving with response (object) or rejecting 
     *  with error
     */
    getCurrentInfo: function (resolveDefaultProject) {
        // var authInfo = this.auth.getCookies();
        var resolveDefaultProject = this.defVal(resolveDefaultProject, true);
        var api = this.api;
        return new Promise(function (resolve, reject) {
            api.serviceRequest(
                'getCurrentEmployeeInfo',
                {},
                true, true,
                function (response) {
                    var info = api.decodeJsonResponse(response);
                    if (info.DefaultProject !== null && resolveDefaultProject) {
                        var prjApi = Breeze.api.company.Project;
                        prjApi.getById(info.DefaultProject).then(
                            function (r) {
                                info.defaultProjectCode = r;
                            }
                        ).catch(function (err) {
                            console.warn('Got error from getProjectById: ', err);
                            info.defaultProjectCode = "";
                        });
                    } else {
                        info.defaultProjectCode = "";
                    }
                    resolve(info);
                },
                function (err) {
                    reject(err);
                }
            )
        })
    },

    updateEmployee: function(parameters){
        var me = this,
            api = me.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'updateEmployee',
                params,
                true, true,
                function(response){
                    var rsp = api.decodeJsonResponse(response);
                    if(rsp.success == true){
                        resolve(true);
                        // TODO: decide where to handle refreshing Employees panel, if enabled
                    } else {
                        resolve(false, rsp.error);
                    }
                },
                function(err){
                    reject(err);
                }
            )
        });
    },

    // TODO: Implement addNewEmployee
    addNewEmployee: function () { },

    // TODO: Finish implementing
    /**
     * Upload profile picture
     * @param {Object} form Form used to submit picture upload
     * @param {String} employeeId Employee ID of picture owner
     * @return {Promise}    Promise resolving with uploaded image URL on success 
     *                      or rejecting with Toast error object (fields type, 
     *                      message and sometimes extra with additional error
     *                      information)
     * @api uploadEmployeePicture
     */
    uploadPicture: function (form, employeeId) {
        var helper = this.helper,
            jar = this.auth.getCookies(),
            cust = jar.cust,
            emp = jar.emp,
            path = Breeze.helper.Settings.employee.profilePicture.path;
            
        console.info('EmpInfo API Upload Picture');
        return new Promise((resolve, reject) => {
            var imageField = form.getComponent('imageFieldSet').
                    getComponent('imageFile'),
                fileExtension = imageField.getFiles()[0].name
                    .split('.').slice(-1)[0].toLowerCase();
            
            // Check file extension
            if(['jpg','jpeg','gif','png','bmp'].indexOf(fileExtension) == -1){
                // If file extension isn't ok, reject with warning
                reject(
                    {
                        type: Ext.Toast.WARN,
                        // TODO: Check if we want this message to say 'Breeze' or 'SoftTime Online'
                        message: 'Invalid image type. The file type ' + fileExtension + 
                            // Original:
                            // ' is not supported by SoftTime Online.<br/>' + 
                            ' is not supported by Breeze.<br/>' + 
                            'Please select a .jpeg, .jpg, .gif, .png, or .bmp file type'
                    }
                );
            }

            form.getComponent('pictureModified').setValue(true);
            form.getComponent('extension').setValue('.' + fileExtension);

            if(form.isValid()){
                // Form is valid, so submit it
                form.submit({
                    url: helper.url('uploadEmployeePicture.ashx'),
                    headers: {'Content-Type': 'application/json'},
                    waitMsg: 'Uploading Image...',
                    /**
                     * Handle submission success
                     */
                    success: function(){
                        var imgUrl = '',
                            randoHash = String.random();
                        if(emp == 'new'){
                            // TODO: Figure out actual path name for images
                            imgUrl = `${path}${cust}/tmp${emp}.${fileExtension}?bob=${randoHash}`;
                        } else {
                            imgUrl = `${path}${cust}/${employeeId}tmp${emp}.${fileExtension}?bob=${randoHash}`;
                        }
                        // Form successfully submitted, resolve URL
                        resolve(imgUrl);
                    },
                    /**
                     * Handle submission failure
                     * @param {Ext.form.Panel} formRef Submitting form reference
                     * @param {Object} results Submission results object
                     */
                    failure: function(formRef, results){
                        // Form submission failed, so reject with generic error, including
                        // copy of resulting 'results' object in 'extra' field
                        reject({
                            type: Ext.Toast.ERROR,
                            message: 'Error occured while uploading image.',
                            extra: results
                        });
                    }

                })
            } else {
                // Form not valid, reject with warning message
                // TODO: Improve copy of this warning message
                reject({
                    type: Ext.Toast.WARN,
                    message: 'Please check form for errors before submitting.'
                });
            }


        });
    },

    // TODO: Implement remove picture
    removePicture: function(form){

    }

});