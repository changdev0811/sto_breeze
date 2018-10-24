/**
 * Top level View Model class for Employee Information
 * @class InformationModel
 * @alias Breeze.view.employee.InformationModel
 * @view Breeze.view.employee.Information
 */
Ext.define('Breeze.view.employee.InformationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employee.information',

    data: {
        employeeName: 'X',
        employeeId: undefined,
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
        companyConfig: {

        },
        // ==[Company tab list visibility ]
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

        info: {
            employee: {
                "__type": "Repository.Entities.Employee",
                "_TerminationDate": null,
                "_HireDate": "\/Date(1526774400000)\/",
                "TerminationDate": "",
                "CustomerID": 991012,
                "ID": 5001,
                "RecordingMode": 21,
                "Shift_Hours": null,
                "FirstName": "Admin",
                "MiddleName": "",
                "LastName": "Venture",
                "HireDate": "",
                "DepartmentName": null,
                "StartUpSettings": 1001,
                "Department": 1001,
                "PunchPolicy": 564,
                "DefaultProject": 0,
                "DisplayName": null,
                "BirthDate": "",
                "Email": null,
                "Notes": "",
                "SSN": "",
                "ExemptStatus": 139,
                "Gender": null,
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
                "Username": "New",
                "LoginType": 15,
                "Supervisors": [],
                "SupervisorIds": [],
                "SupervisorDeptsIds": [],
                "SupervisorTerms": [],
                "SupervisedEmps": [],
                "SupervisedEmpIds": [],
                "SupervisedEmpDeptsIds": [],
                "SupervisedEmpTerms": [],
                "SupervisedDepts": [
                    "Extra Department",
                    "Test Department"
                ],
                "SupervisedDeptIds": [
                    1002,
                    1001
                ],
                "DeptRoles": [
                    "Full Supervisor",
                    "Full Supervisor"
                ],
                "DeptRoleIds": [
                    1003,
                    1003
                ],
                "ViewSSN": 1,
                "ViewComp": 1,
                "LayoffStatus": "Active",
                "LayoffDate": null,
                "WorkRecords": null,
                "shiftHours": 13,
                "displayName": "Venture, Admin",
                "firstLast": "Admin Venture",
                "possessiveFirstLast": "Admin Venture\u0027s"
            },

            "punchPolicy": {
                "__type": "Repository.Entities.Punch_Policy_Info",
                "policy_id": 0,
                "customer_id": 991012,
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
                "Can_Use_InOut": true
            }
        }
    },

    formulas: {
        hireDate: function (get) {
            return Ext.util.Format.date(
                get('info.HireDate'), "m/d/Y"
            );
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

        hideNotesButton: function (get) {
            var notes = get('info.Notes');
            return (typeof notes == 'undefined' || notes == null || notes === "") ? true : false;
        },

        employeeNotes: function (get) {
            var notes = get('info.Notes');
            if (notes == null || notes == "") {
                return "No notes are currently recorded.";
            } else {
                return notes;
            }
        },

        /**
         * Pull all form data from elsewhere in model and return it in a single object
         * using the expected parameter names for submitting data updates
         */
        formData: function (get) {
            return {
                employee_id: get('employeeId'),
                first_name: get('info.FirstName'),
                last_name: get('info.LastName'),
                middle_name: get('info.MiddleName'),
                company_employee_id: get('info.CustomerId'),
                ssn: get('info.SSN'),
                payroll: get('info.Payroll'),
                date_of_hire: get('info.HireDate'),
                date_of_birth: get('info.BirthDate'),
                date_of_termination: get('info.TerminationDate'),
                comp_rate: get('info.CompRate'),
                comp_per: get('info.CompPer'),
                sex: get('info.Gender'),
                picture_path: get('info.Photo'),
                picture_modified: get('info.PhotoFlag'),
                // exempt: (get('info.Exempt') == 138),
                exempt: false,
                notes: get('info.Notes'),
                recording_mode: get('info.RecordingMode'),
                exempt_status: get('info.ExemptStatus'),
                badge_id: get('info.Badge'),
                email: get('info.Email').trim(),
                department_id: get('info.Department'),
                schedule_id: get('info.StartUpSettings'),
                punchpolicy_id: get('info.punchPolicy.policy_id'),
                default_project: get('info.DefaultProject'),
                // TODO: figure out what determines these values
                changeAllowedTime: null,
                changePastTime: null,
                changeUserModifiedTime: null,
                user_modified: null,
                shiftStartSegments: get('info.ShiftStartSegments'),
                shiftStopSegments: get('info.ShiftStopSegments'),
                user_type: get('info.LoginType'),
                supervisor_ids: get('info.SupervisorIds'),
                employee_ids: get('info.SupervisedEmpIds'),
                department_ids: get('info.SupervisedDeptIds'),
                department_role_ids: get('info.DeptRoleIds'),
                ot_opt1: get('info.punchPolicy.Ot_Opt1'),
                ot_opt2: get('info.punchPolicy.Ot_Opt2'),
                ot_opt3: get('info.punchPolicy.Ot_Opt3'),
                ot_opt4: get('info.punchPolicy.Ot_Opt4'),
                ot_day1: get('overtime_day1'),
                ot_day2: get('overtime_day2'),
                ot_day3: get('overtime_day3'),
                ot_day4: get('overtime_day4'),
                ot_week1: get('overtime_week1'),
                ot_week2: get('overtime_week2'),
                ot_week3: get('overtime_week3'),
                ot_week4: get('overtime_week4'),
                ot_rate1: get('info.punchPolicy.Ot_Rate1'),
                ot_rate2: get('info.punchPolicy.Ot_Rate2'),
                ot_rate3: get('info.punchPolicy.Ot_Rate3'),
                ot_rate4: get('info.punchPolicy.Ot_Rate4'),
                subtract_dayot: get('info.punchPolicy.Subtract_DayOt'),
                round_increment: get('info.punchPolicy.Round_Increment'),
                round_offset: get('info.punchPolicy.round_offset'),
                Allow_RegularPunch: get('info.punchPolicy.Allow_RegularPunch'),
                Allow_QuickPunch: get('info.punchPolicy.Allow_QuickPunch'),
                Auto_PunchIn: get('info.punchPolicy.Auto_PunchIn'),
                Auto_PunchOut: get('info.punchPolicy.Auto_PunchOut'),
                Auto_Close_Shift: get('info.punchPolicy.Auto_Close_Shift'),
                Auto_Lunch_Punch: get('info.punchPolicy.Auto_LunchPunch'),
                LunchPunch_Seg: get('info.punchPolicy.LunchPunch_Seg'),
                LunchPunch_Hours: get('info.punchPolicy.LunchPunch_Hours'),
                Can_Add_Projects: get('info.punchPolicy.Can_Add_Projects'),
                Can_Add_Notes: get('info.punchPolicy.Can_Add_Notes'),
                Can_Edit_Projects: get('info.punchPolicy.Can_Edit_Notes'),
                Can_Adjust_Punches: get('info.punchPolicy.Can_Adjust_Punches'),
                Can_Use_TimeSheets: get('info.punchPolicy.Can_Use_TimeSheets'),
                InOut_Opt: get('info.punchPolicy.InOut_Opt'),
                Can_Use_InOut: get('info.punchPolicy.Can_Use_InOut')
            };
        },

        /**
         * Formula returning filtered selection of supervisors based on supervisor
         * IDs defined in employee info data object
         */
        companySupervisorChoices: {
            bind: {
                store: '{supervisors}',
                ids: '{info.SupervisorIds}'
            },
            get: function (data) {
                return data.store.queryRecordsBy(
                    function (rec) {
                        return data.ids.includes(rec.id);
                    }
                );
            }
        },

        companyDepartmentOptions: {
            bind: {
                // deptStore: '{departments}',
                // roleStore: '{securityRoles}',
                deptIds: '{info.SupervisedDeptIds}',
                deptNames: '{info.SupervisedDepts}',
                roleIds: '{info.DeptRoleIds}',
                roleNames: '{info.DeptRoles}'
            },
            get: function (data) {
                return data.deptIds.map(function (v, idx) {
                    return {
                        // displayName: data.deptStore.findRecord('Id', v).get('Name'),
                        // role: data.roleStore.findRecord('Role_Id', data.roleIds[idx]).get('Role_Name')
                        displayName: data.deptNames[idx],
                        role: data.roleNames[idx]
                    }
                });
            }
        },

        profileImage: function (get) {
            if (get('info.PhotoFlag')) {
                return get('info.Photo');
            } else {
                return 'resources/photos/default_user.png'
            }
        }

    }

});