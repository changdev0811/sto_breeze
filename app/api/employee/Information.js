/**
 * API calls for Employee sub-scope Information. 
 * Extends Breeze.api.Base, providing access to helpers.
 * Should be accessed indirectly through Breeze.api.Employee
 * @class Information
 * @alias Breeze.api.employee.Information
 * @memberof Breeze.api.employee
 */
Ext.define('Breeze.api.employee.Information', {
    extend: 'Breeze.api.Base',
    singleton: true,

    /**
     * Staff time enum for departmentStaff
     */
    departmentStaffType: {
        EMPLOYEE: 0,
        SUPERVISOR: 1,
        BOTH: 2
    },

    /**
     * Gets employee info
     * @api getEmployeeInfo
     * @param {String} employeeId ID of employee
     * @param {String} storeId name of store to load into
     */
    getEmployeeInfo: function (employeeId, storeId) {
        var authInfo = this.auth.getCookies();
        var employeeId = Object.defVal(employeeId, authInfo.emp);
        var storeId = Object.defVal(storeId, 'employee_info');
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
        var resolveDefaultProject = Object.defVal(resolveDefaultProject, true);
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
            api = me.api,
            cookies = me.auth.getCookies(),
            params = Object.assign({}, parameters);
        params.emp_id = cookies.emp;
        params.cust_id = cookies.cust;
        params.hashcookie = cookies.pass;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'updateEmployee',
                params,
                true, true,
                function(response){
                    var rsp = api.decodeJsonResponse(response);
                    if(rsp.success == true){
                        resolve({
                            message: 'Employee Information successfully saved.',
                            type: Ext.Toast.INFO,
                            info: rsp.info,
                            err: rsp.err
                        });
                    } else {
                        var msg = 'An error occured';
                        if(!Object.isUnvalued(rsp.err)){
                            msg = msg.concat('<br>(',rsp.err,')');
                        }
                        reject({
                            message: msg,
                            type: Ext.Toast.ERROR,
                            info: rsp.info,
                            err: rsp.err
                        });
                    }
                },
                function(err){
                    var msg = 'An error occured';
                    if(!Object.isUnvalued(err.statusText)){
                        msg = msg.concat('<br>(',err.statusText,')');
                    }
                    reject({
                        message: msg,
                        type: Ext.Toast.ERROR,
                        info: null,
                        err: err
                    });
                }
            )
        });
    },

    // TODO: Implement addNewEmployee
    addNewEmployee: function (params) { 
        var api = this.api,
            jar = this.auth.getCookies();
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'addNewEmployee',
                params,
                true, true,
                function(resp){
                    var response = api.decodeJsonResponse(resp);
                    if(response.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: 'Successfully created Employee',
                            info: null
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: 'Error occured',
                            info: response.err
                        });
                    }
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error occured',
                        info: err
                    });
                }
            )
        });
    },

    /**
     * Upload profile picture using AJAX
     * @param {Object} form Form containing input fields
     * @param {String} employeeId Employee ID of picture owner
     * @return {Promise}    Promise resolving with uploaded image URL on success 
     *                      or rejecting with Toast error object (fields type, 
     *                      message and sometimes extra with additional error
     *                      information)
     * @api uploadEmployeePicture
     */
    uploadPictureAjax: function (form, employeeId) {
        var api = this.api,
            jar = this.auth.getCookies(),
            hash = jar.pass,
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

            // Update hidden form fields

            // internal shorthand function for setting form field values
            var setField = (name,val) => { form.getComponent(name).setValue(val);};

            setField('pictureModified', true);
            setField('hasPicture', true);
            setField('extension', `.${fileExtension}`);
            setField('empId', emp);
            setField('custId', cust);
            setField('employeeId', employeeId);
            setField('hashcookie', hash);

            // console.info('Form Values:');
            // console.table(form.getValues());

            if(form.isValid()){
                // Quickly construct FormData object from form panel component
                var buildFormData = function(form) 
                    {
                        var data = new FormData(),
                            values = form.getValues(),
                            fields = Object.keys(values);
                        fields.forEach((f)=>{
                            data.append(f,values[f]);
                        });
                        return data;
                    },
                    // Copy form field values to form data object
                    formData = buildFormData(form);
                
                // Add image file field to FormData object
                formData.append(
                    'photo_upload',
                    form.getComponent('imageFieldSet')
                        .getComponent('imageFile')
                        .getFiles()[0]
                );

                // Prepare parameters for AJAX request
                var ajaxParams = {
                    url: api.ashxUrl('uploadEmployeePicture.ashx'),
                    method: 'POST',
                    // defaultHeaders: {'Content-Type': 'application/json'},
                    // params: formData,
                    rawData: formData,
                    headers: {'Content-Type': null}, // auto decide content type
                    // cors: true,
                    /**
                     * Handle successful AJAX request
                     * @param {Object} resp Response data
                     * @param {Object} opts Options
                     */
                    success: function(resp, opts){
                        console.info('Upload picture response: ', resp.responseText);
                        var response = JSON.parse(resp.responseText);
                        if(response.success){
                            // Successful, resolve with generated URL
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
                        } else {
                            var msg = (response.message)? response.message : 
                                (response.error)? response.error : 'Unknown';
                            // response.success false, reject with error message
                            reject({
                                type: Ext.Toast.ERROR,
                                message: 'Error occured during upload<br>'.concat(
                                    '(', msg, ')'
                                ),
                                extra: response
                            });
                        }
                    },
                    /**
                     * Handle request failure
                     * @param {Object} resp Response data
                     * @param {Object} opts Options
                     */
                    failure: function(resp, opts){
                        var response = JSON.parse(resp.responseText),
                            // grab error detail message from response, if present
                            msg = (response.message)? response.message : 
                                (response.error)? response.error : 'Unknown';
                        
                        // Failure occurred, so show generic error message, and include
                        // additional details from response message, if available
                        reject({
                            type: Ext.Toast.ERROR,
                            message: 'Error occured<br>'.concat(
                                '(', msg, ')'
                            ),
                            extra: response
                        });
                    }
                };

                // Perform AJAX request
                Ext.Ajax.request(ajaxParams);

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

    uploadPicture: function(form, employeeId){
        var api = this.api,
            cookie = this.auth.getCookies(),
            cForm = Ext.clone(form),
            url = api.ashxUrl('uploadEmployeePicture.ashx');
        
        // shorthand assign values to input fields by item id
        let setFormVal = (itemId, val) => { 
            cForm.getComponent(itemId).setValue(val); 
        };

        setFormVal('employeeId', employeeId);
        setFormVal('empId', cookie.emp);
        setFormVal('custId', cookie.cust);
        setFormVal('hashcookie', cookie.pass);
        
        return new Promise((resolve, reject)=>{
            api.upload(
                'ashx', 'uploadEmployeePicture.ashx',
                cForm, 'Uploading Image', true,
                /**
                 * Success callback
                 * @param {Object} f Form object
                 * @param {Object} r Response object
                 */
                function(f,r){
                    let picPath = Breeze.helper.settings.Employee.profilePicture,
                        ext = f.getComponent('extension').getValue(),
                        custId = f.getComponent('custId').getValue(),
                        employeeId = f.getComponent('employeeId').getValue(),
                        empId = f.getComponent('empId').getValue(),
                        resp = {
                            response: r,
                            path: (employeeId == 'new')?
                                `${picPath.path}${custId}/tmp${cookie.emp}${ext}?bob=${String.random()}` :
                                `${picPath.path}${custId}/${employeeId}tmp${empId}${ext}?bob=${String.random()}`
                        };
                    resolve(resp);
                },
                function(f,err){
                    reject(err);
                }
            );
            // api.upload(
            //     'ashx', 'uploadEmployeePicture.ashx',
            //     cForm.el.dom, 'Uploading Image', true,
            //     function(r){
            //         var resp = api.decodeJsonResponse(r,null);
            //         resolve(resp);
            //     },
            //     function(err){
            //         reject(err);
            //     }
            // );

        });
    },

    /**
     * Check if username is available
     * @param {String} userName Username to check
     * @return {Promise} Promise resolving in true or false indicating if name is available
     */
    checkUsername: function(userName){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'checkUsername', {
                    employee_id: 0,
                    username: userName
                },
                true, false,
                function(r){
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve(true);
                    } else {
                        reject(resp.err)
                    }
                },
                function(err){
                    reject('Invalid username');
                }
            )
        });
    },

    /**
     * Method is form specific, so logic is defined in employee/InformationController
     * @see Breeze.view.employee.InformationController.onRemoveProfilePicture
     * @deprecated
     */
    removePicture: function(){
    },

    /**
     * Check layoff effective date
     * @param {Number} employeeId Employee ID
     * @param {Date} effectiveDate Effective layoff date
     * @return {Promise} resolving with true or rejecting with error
     * @api /CheckLayoffEffectiveDate
     */
    checkLayoffEffectiveDate: function(employeeId, effectiveDate){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'CheckLayoffEffectiveDate',
                { 
                    employee_id: employeeId, 
                    effectivedate: effectiveDate.shortDate() 
                },
                true, true,
                function(resp){
                    var response = api.decodeJsonResponse(resp);
                    if(response.success){
                        resolve(true);
                    } else {
                        reject(response.err);
                    }
                },
                function(err){
                    reject(err);
                }
            )
        });
    },

    /**
     * Toggle employee layoff status
     * @param {Number} employeeId Employee ID
     * @param {Date} effectiveDate Effective layoff date
     * @return {Promise} resolving with true or rejecting with message
     * @api /ToggleEmployeeLayoff
     */
    toggleLayoff: function(employeeId, effectiveDate){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'ToggleEmployeeLayoff',
                { 
                    employee_id: employeeId, 
                    effectivedate: effectiveDate.toUTCString() 
                },
                true, true,
                function(resp){
                    var response = api.decodeJsonResponse(resp);
                    if(response.status){
                        resolve(true);
                    } else {
                        reject(response.message);
                    }
                },
                function(err){
                    reject(err);
                }
            )
        });
    },

    departmentStaff: function(departmentId, staffType){
        var staffType = Object.defVal(staffType, 
            Breeze.api.employee.Information.departmentStaffType.BOTH),
            api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'getDepartmentStaff',
                {
                    department_id: departmentId,
                    staff_type: staffType
                },
                true, false,
                function(r){
                    resolve(api.decodeJsonResponse(r));
                },
                function(err){
                    reject(err);
                }
            )
        });
    }

});