/**
 * Top level View Model class for Employee Information
 * @class InformationModel
 * @memberof Breeze.view.employee
 * @alias Breeze.view.employee.InformationModel
 * @view Breeze.view.employee.Information
 */
(function(){Ext.define('Breeze.view.employee.InformationModel', {
    extend: 'Breeze.viewmodel.Base',
    alias: 'viewmodel.employee.information',

    constructor: function(cfg){
        this.callParent([cfg]);
        this.setData({
            employeeName: 'X',
            employeeId: undefined,
            newEmployee: false,
            departmentName: 'X',
            points: '',
            // When true, fields will be read-only
            readOnly: true,
            // Recieves emp role permission settings
            perms: {
                ssn: false, // is SSN shown?
                compensation: false // is compensation shown?
            },
            // Misc config settings from company config
            // companyConfig: {
    
            // },
            // Holdes notes before committing changes
            tempNotes: "",
            // ==[Company tab list visibility]==
            lists: {
                supervisors: {
                    enabled: true,
                    readonly: true
                },
                employees: {
                    enabled: true,
                    readonly: true
                },
                departments: {
                    enabled: true,
                    readonly: true
                },
            },
    
            // ==[Form Validation/Save Prep]==
            form: {
                // Validation error message text
                validationMessage: '',
                // whether changes have been made that can be reverted
                canRevert: true
            },
    
            // ==[Error Messages]==
            errors: {
                company: {
                    supervisor: {
                        noChoices:
                            'This employee is already supervised by all of their department\'s ' +
                            'supervisors.',
                        noChoicesNonTerminated:
                            'This employee is already supervised by all of their department\'s ' +
                            'non-terminated supervisors.'
                    },
                    employee: {
                        noChoices:
                            'This supervisor already has rights to all of their departments\' ' +
                            'employees.',
                        noChoicesNonTerminated:
                            'This supervisor already has rights to all of their department\'s ' +
                            'non-terminated employees.',
                        noDepartments:
                            'This supervisor must have departments before employees.'
                    }
                }
            },
    
            info: {
                
            },
            
            accrual: {
                changeMode: 1,
                changePast: false,
                changeUserModified: false,
                changeAllowedTime: false
            },

            newRecord: {
                employee: {
                    // "__type": "Repository.Entities.Employee",
                    // "_TerminationDate": null,
                    // "_HireDate": (new Date()),
                    "TerminationDate": "",
                    "CustomerID": "",
                    "ID": 0,
                    "RecordingMode": 21,
                    "Shift_Hours": null,
                    "FirstName": "",
                    "MiddleName": "",
                    "LastName": "",
                    "HireDate": (new Date()),
                    "DepartmentName": "",
                    "StartUpSettings": 1001,
                    "Department": null,
                    "PunchPolicy": 0,
                    "DefaultProject": 0,
                    "DisplayName": null,
                    "BirthDate": "",
                    "Email": "",
                    "Notes": "",
                    "SSN": "",
                    "ExemptStatus": 139,
                    "Gender": 0,
                    "EmployeeNumber": "",
                    "Payroll": "",
                    "Badge": "",
                    "CompRate": 0.00,
                    "CompPer": 5,
                    "ShiftSegComboStartTimes": [
                    ],
                    "ShiftSegComboStopTimes": [
    
                    ],
                    "ShiftStartTimes": [
                    ],
                    "ShiftStopTimes": [
                    ],
                    "ShiftStartSegments": [
                    ],
                    "ShiftStopSegments": [
                    ],
                    "PhotoFlag": false,
                    "Photo": "app/resources/EmployeePhotos/default_man.png",
                    "Username": "",
                    "LoginType": 13,
                    "Supervisors": [],
                    "SupervisorIds": [],
                    "SupervisorDeptsIds": [],
                    "SupervisorTerms": [],
                    "SupervisedEmps": [],
                    "SupervisedEmpIds": [],
                    "SupervisedEmpDeptsIds": [],
                    "SupervisedEmpTerms": [],
                    "SupervisedDepts": [],
                    "SupervisedDeptIds": [
                    ],
                    "DeptRoles": [],
                    "DeptRoleIds": [],
                    "ViewSSN": 1,
                    "ViewComp": 1,
                    "LayoffStatus": "Active",
                    "LayoffDate": null,
                    "WorkRecords": null,
                    "shiftHours": 13,
                    "displayName": "",
                    "firstLast": "",
                    "possessiveFirstLast": ""
                },
    
                "punchPolicy": {
                    "__type": "Repository.Entities.Punch_Policy_Info",
                    "policy_id": 0,
                    "customer_id": 0,
                    "policy_name": null,
                    "IsFixed": false,
                    "Ot_Opt1": true,
                    "Ot_Opt2": false,
                    "Ot_Opt3": false,
                    "Ot_Opt4": false,
                    "Ot_Day1": 36000,
                    "Ot_Day2": 0,
                    "Ot_Day3": 0,
                    "Ot_Day4": 0,
                    "Ot_Week1": 144000,
                    "Ot_Week2": 0,
                    "Ot_Week3": 0,
                    "Ot_Week4": 0,
                    "Ot_Rate1": 1.50,
                    "Ot_Rate2": 0.00,
                    "Ot_Rate3": 0.00,
                    "Ot_Rate4": 0.00,
                    "Subtract_DayOt": true,
                    "Round_Increment": 10,
                    "Round_Offset": 2,
                    "Allow_RegularPunch": true,
                    "Allow_QuickPunch": true,
                    "Auto_PunchIn": true,
                    "Auto_PunchOut": false,
                    "Auto_Close_Shift": 8,
                    "Auto_LunchPunch": false,
                    "LunchPunch_Seg": 0,
                    "LunchPunch_Hours": 8,
                    "Can_Add_Projects": true,
                    "Can_Add_Notes": true,
                    "Can_Edit_Notes": true,
                    "Can_Adjust_Punches": false,
                    "Can_Use_TimeSheets": true,
                    "InOut_Opt": false,
                    "Can_Use_InOut": true,
                    "TimeSheet_Submission_Required": true
                }
            },

            photo: null,

            originals: {
                StartUpSettings: null,
                PunchPolicy: null,
                DefaultProject: null,
                Department: null
            }
        })
    },

    formulas: {
        hireDate: {
            get: function (get) {
                return Ext.util.Format.date(
                    get('info.HireDate'), "m/d/Y"
                );
            },
            set: function(value){
                this.set(
                    'info.HireDate',
                    (new Date(value)).toLocaleString()
                );
            }
        },
        terminationDate: {
            get: function (get) {
                return Ext.util.Format.date(
                    get('info.TerminationDate'), "m/d/Y"
                );
            },
            set: function(value){
                this.set(
                    'info.TerminationDate',
                    (new Date(value)).toLocaleString()
                );
            }
        },
        overtime_day1: {
            get: function (get) {
                return (get('info.punchPolicy.Ot_Day1') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'info.punchPolicy.Ot_Day1', value * 60 * 60
                )
            }
        },
        overtime_day2: {
            get: function (get) {
                return (get('info.punchPolicy.Ot_Day2') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'info.punchPolicy.Ot_Day2', value * 60 * 60
                )
            }
        },
        overtime_day3: {
            get: function (get) {
                return (get('info.punchPolicy.Ot_Day3') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'info.punchPolicy.Ot_Day3', value * 60 * 60
                )
            }
        },
        overtime_day4: {
            get: function (get) {
                return (get('info.punchPolicy.Ot_Day4') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'info.punchPolicy.Ot_Day4', value * 60 * 60
                )
            }
        },
        overtime_week1: {
            get: function (get) {
                return (get('info.punchPolicy.Ot_Week1') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'info.punchPolicy.Ot_Week1', value * 60 * 60
                )
            }
        },
        overtime_week2: {
            get: function (get) {
                return (get('info.punchPolicy.Ot_Week2') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'info.punchPolicy.Ot_Week2', value * 60 * 60
                )
            }
        },
        overtime_week3: {
            get: function (get) {
                return (get('info.punchPolicy.Ot_Week3') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'info.punchPolicy.Ot_Week3', value * 60 * 60
                )
            }
        },
        overtime_week4: {
            get: function (get) {
                return (get('info.punchPolicy.Ot_Week4') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'info.punchPolicy.Ot_Week4', value * 60 * 60
                )
            }
        },

        //===[Overtime Checkbox Formulas]===
        overtime2Enabled: {
            bind: {
                ot1: '{info.punchPolicy.Ot_Opt1}'
            },
            get: function (data) {
                return data.ot1;
            }
        },
        overtime3Enabled: {
            bind: {
                ot1: '{info.punchPolicy.Ot_Opt1}',
                ot2: '{info.punchPolicy.Ot_Opt2}'
            },
            get: function (data) {
                return data.ot1 && data.ot2;
            }
        },
        overtime1Checked: {
            get: function (get) {
                return get('info.punchPolicy.Ot_Opt1');
            },
            set: function (value) {
                this.set('info.punchPolicy.Ot_Opt1', value);
                if (!value) {
                    this.setMultiple(
                        [
                            'info.punchPolicy.Ot_Opt2',
                            'info.punchPolicy.Ot_Opt3',
                            'info.punchPolicy.Ot_Opt4'
                        ],
                        false
                    );
                }
            }
        },
        overtime2Checked: {
            get: function (get) {
                return get('info.punchPolicy.Ot_Opt2');
            },
            set: function (value) {
                this.set('info.punchPolicy.Ot_Opt2', value);
                if (!value) {
                    this.setMultiple(
                        [
                            'info.punchPolicy.Ot_Opt3',
                            'info.punchPolicy.Ot_Opt4'
                        ],
                        false
                    );
                }
            }
        },
        overtime3Checked: {
            get: function (get) {
                return get('info.punchPolicy.Ot_Opt3');
            },
            set: function (value) {
                this.set('info.punchPolicy.Ot_Opt3', value);
                if (!value) {
                    this.set('info.punchPolicy.Ot_Opt4', false);
                }
            }
        },

        /**
         * Indicates whether user can upload a profile picture based on
         * whether accessLevel is > Breeze.api.Employee.accessLevel.EMPLOYEE
         * @member
         * @formula
         */
        canUploadPicture: {
            bind: '{accessLevel}',
            get: function(data){
                return (data > Breeze.api.Employee.accessLevel.EMPLOYEE);
            }
        },

        hasTempNotes: function (get) {
            var notes = get('tempNotes');
            return (typeof notes == 'undefined' || notes == null || notes === "") ? false : true;
        },

        employeeNotes: function (get) {
            var notes = get('info.Notes');
            if (notes == null || notes == "") {
                return "No notes are currently recorded.";
            } else {
                return notes;
            }
        },

        isLaidOff: function (get) {
            return (get('info.LayoffStatus') == 'Laid Off');
        },

        /**
         * Text to show on layoff button based on current state
         * @param {Function} get 
         * @return {String} Button text
         */
        layoffButtonText: function(get){
            if(get('isLaidOff')){
                return 'Reinstate';
            } else {
                return 'Active';
            }
        },

        /**
         * Path to profile photo, pulled either from custom ({photo}) or original 
         * ({info.Photo})
         */
        profilePicture: {
            bind: {
                original: '{info.Photo}',
                isCustom: '{info.PhotoFlag}',
                custom: '{photo}'
            },
            get: function(data){
                if(data.custom == null){
                    return data.original;
                } else {
                    return data.custom;
                }
            }
        },

        wasProfilePictureModified: function(get){
            if(get('info.PhotoFlag')){
                return (get('photo') !== get('info.Photo'));
            } else {
                return (get('photo') !== null);
            }
        },

        /**
         * Formula returning bool indicating whether employee has a
         * custom profile picture set or not
         * @param {Function} get ViewModel get function reference
         * @return {Boolean} True if custom picture, false otherwise
         */
        hasCustomProfilePicture: function (get) {
            return (get('photo') !== null);
        },

        /**
         * Formula checking whether its possible to add a new shift to the
         * shift information grid
         * @param {Function} get ViewModel get function reference
         * @return {Boolean} Boolean indicating whether add shift button should be enabled
         */
        canAddShift: function (get) {
            return (
                !get('readOnly') &&
                (get('shift.segments').count() < 2)
            );
        },

        /**
         * Formula that runs once and builds a list of 48 shift time choices
         * paired with numerical values
         */
        shiftChoicesFormula: {
            single: true,
            /*
            get: function(get){
                // Function that builds array of numerical shift values
                var genValues = ()=>{for(var b=[],a=0,c=0;48>a;a++,c=30*a)b.push(c);return b},
                    genTime = (val)=>{
                        var h = Math.floor(val/60.0),
                            H = (h%12),
                            m = (val % 60),
                            t = (val < 720)? 'AM' : 'PM';
                        H = (H==0)? 12 : H;
                        return `${H}:${m.toZeroPaddedString(2)} ${t}`;
                    };
                return genValues().map((v)=>{
                    return {value: v, time: genTime(v)};
                });
            }*/
            get: function (get) {
                return function () {
                    for (var b = [], a = 0, c = 0; 48 > a; a++ , c = 30 * a)b.push(c);
                    return b
                }().map(function (b) {
                    var a = Math.floor(b / 60) % 12;
                    var c = 720 > b ? "AM" : "PM"; a = (0 == a ? 12 : a) + ":" + (b % 60)
                        .toZeroPaddedString(2) + c; return { value: b, time: a }
                });
            }

        }

    }

});})();