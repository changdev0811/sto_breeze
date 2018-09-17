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
        }
    },

    stores: {

    },

    formulas: {
        hireDate: function(get){
            return Ext.util.Format.date(
                get('info.HireDate'), "m/d/Y"
            );
        },
        overtime_day1: function(get){
            return (get('info.punchPolicy.Ot_Day1')/60/60);
        },
        overtime_day2: function(get){
            return (get('info.punchPolicy.Ot_Day2')/60/60);
        },
        overtime_day3: function(get){
            return (get('info.punchPolicy.Ot_Day3')/60/60);
        },
        overtime_day4: function(get){
            return (get('info.punchPolicy.Ot_Day4')/60/60);
        },
        overtime_week1: function(get){
            return (get('info.punchPolicy.Ot_Week1')/60/60);
        },
        overtime_week2: function(get){
            return (get('info.punchPolicy.Ot_Week2')/60/60);
        },
        overtime_week3: function(get){
            return (get('info.punchPolicy.Ot_Week3')/60/60);
        },
        overtime_week4: function(get){
            return (get('info.punchPolicy.Ot_Week4')/60/60);
        },

        hideNotesButton: function(get){
            var notes = get('info.Notes');
            return (typeof notes == 'undefined' || notes == null || notes === "") ? true : false;
        },

        employeeNotes: function(get){
            var notes = get('info.Notes');
            if(notes == null || notes == ""){
                return "No notes are currently recorded.";
            } else {
                return notes;
            }
        },

        /**
         * Formula returning filtered selection of supervisors based on supervisor
         * IDs defined in employee info data object
         */
        companySupervisorsList: {
            bind: {
                store: '{supervisors}',
                ids: '{info.SupervisorIds}'
            },
            get: function(data){
                return data.store.queryRecordsBy(
                    function(rec){
                        return data.ids.includes(rec.id);
                    }
                );
            }
        },

        companyEmployeesList: {
            bind: {
                store: '{employees}',
                ids: '{info.SupervisedEmpIds}'
            },
            get: function(data){
                return data.store.queryRecordsBy(
                    function(rec){
                        return data.ids.includes(rec.id);
                    }
                )
            }
        },

        // companyDepartmentsList: {
        //     bind: {
        //         store: '{departments}',
        //         ids: '{info.SupervisedDeptIds}'
        //     },
        //     get: function(data){
        //         return data.store.queryRecordsBy(function(rec){return data.ids.includes(rec.id);});
        //     }
        // },

        companyDepartmentsList: {
            bind: {
                // deptStore: '{departments}',
                // roleStore: '{securityRoles}',
                deptIds: '{info.SupervisedDeptIds}',
                deptNames: '{info.SupervisedDepts}',
                roleIds: '{info.DeptRoleIds}',
                roleNames: '{info.DeptRoles}'
            },
            get: function(data){
                return data.deptIds.map(function(v,idx){
                    return {
                        // displayName: data.deptStore.findRecord('Id', v).get('Name'),
                        // role: data.roleStore.findRecord('Role_Id', data.roleIds[idx]).get('Role_Name')
                        displayName: data.deptNames[idx],
                        role: data.roleNames[idx]
                    }
                });
            }
        },

        profileImage: function(get){
            if(get('info.PhotoFlag')){
                return get('info.Photo');
            } else {
                return 'resources/photos/default_user.png'
            }
        }
        
    }

});