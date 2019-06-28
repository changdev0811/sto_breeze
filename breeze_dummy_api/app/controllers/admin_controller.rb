class AdminController < GenericController

    GenericResponses = {
        # supervisor roles
        add_supervisor_role: {
            pass: {err: nil, info:['Added']},
            fail:{err:"Error",info:[]}
        },
        update_supervisor_role: {
            pass: {err: nil, info:['Added']},
            fail:{err:"Error",info:[]}
        },
        check_supervisor_role: {
            pass: {err: "0", info: []},
            conflict: {err: "4", info:["1001","Limited Supervisor","1002","Read Only Supervisor"]},
            fail: {err: "Failed", info: []}
        },
        delete_supervisor_role: {
            pass: {err: "Supervisor role was successfully deleted", 
                info: ['Role Name','Success']
            },
            fail: {err: "Failed", info: []}
        },
        # super admin options
        get_time_kron_status: {
            pass: {val: true}, # TODO: fix const value
            fail: {val: false},
            builder: 'simple.json'
        },
        # restore employee
        restore_employee: {
            pass: { err: 'Deleted peron restored successfully', info: ['Restored deleted'] },
            fail: { err: 'Error message', info: [] }
        },
        # point cats
        add_point_category: {
            pass: { err: "3", info: [ 'User add a point category' ]},
            fail: {err: 'Failure test message', info: []}
        },
        delete_point_category: {
            pass: { err: nil, info: [ 'Sample success message' ]},
            fail: {err: 'Failure test message', info: []}
        },
        update_point_category: {
            pass: { err: nil, info: [ 'Sample success message' ]},
            fail: {err: 'Failure test message', info: []}
        },
        # projects
        add_project: {
            pass: { err: "5594", info: ['User added a project']},
            fail: { err: 'Unable to create project', info: [] }
        },
        remove_project: {
            pass: { err: "0", info: ['User removed a project']},
            fail: { err: 'Unable to remove project', info: [] }
        },
        update_project_information: {
            pass: { err: "0", info: ['User updated project']},
            fail: { err: 'Unable to update project', info: [] }
        },
        # holiday editor
        append_holidays_to_year: {
            pass: { err: 'Holiday append successful', info: [""]},
            fail: { err: 'Holiday append error', info: [""]}
        },
        apply_holiday_to_employees: {
            pass: { err: "All holidays were successfully applied to all employees", info: ["All Holidays were successfully applied to all employees","Venture, Admin applied all holidays to all employees"]},
            fail: { err: 'Holiday append error', info: [""]}
        },
        edit_holiday: {
            pass: { err: 'Holiday was updated', info: ['Holiday was updated']},
            fail: { err: 'Holiday update error', info: ['']}
        },
        delete_holiday: {
            pass: { err: 'Holiday was deleted', info: ['Holiday was deleted']},
            fail: { err: 'Holiday delete error', info: ['']}
        },
        # punch policies
        add_punch_policy: {
            pass: { err: '919', info: ['Policy added']},
            fail: { err: 'Error adding policy', info: []}
        },
        remove_punch_policy: {
            pass: { err: '', info: ['Policy removed']},
            fail: { err: 'Error removing policy', info: []}
        },
        update_punch_policy_information: {
            pass: { err: '', info: ['Updated punch policy']},
            fail: { err: 'Error updating punch policy', info: []}
        },
        apply_punch_policy_to_employees: {
            pass: { err: '', info: ['Policy applied']},
            fail: { err: 'Error applying policy', info: []}
        },
        # departments
        can_delete_dept: {
            pass: { err: '', info: ['']},
            fail: { err: 'The following employees belong to the department you are attempting to delete: <BR><BR>Venture, Admin <BR>Thompson, Shawn <BR>Harkins, Wade <BR>Wszalek, Jonathan M<BR>Employee, Menial <BR><BR>You cannot delete this department until it is empty', info: []}
        },
        remove_dept: {
            pass: { err: '', info: ['Department removed']},
            fail: { err: 'Unable to remove department', info: []}
        },
        create_dept: {
            pass: { err: '', info: ['Department created']},
            fail: { err: 'Unable to create department', info: []}
        },
        update_dept: {
            pass: { err: '', info: ['Department updated']},
            fail: { err: 'Unable to update department', info: []}
        },
        
    }

    GenericPassing = {
        # supervisor roles
        add_supervisor_role: :pass,
        check_supervisor_role: :conflict,
        delete_supervisor_role: :pass,
        # super admin options
        get_time_kron_status: :pass,
        # restore employees
        restore_employee: :pass,
        # point cats
        add_point_category: :pass,
        delete_point_category: :pass,
        update_point_category: :pass,
        # projects
        add_project: :pass,
        remove_project: :pass,
        update_project_information: :pass,
        # holiday editor
        append_holidays_to_year: :pass,
        apply_holiday_to_employees: :pass,
        edit_holiday: :pass,
        delete_holiday: :pass,
        # punch policies
        add_punch_policy: :pass,
        remove_punch_policy: :pass,
        update_punch_policy_information: :pass,
        apply_punch_policy_to_employees: :pass,
        # departments
        can_delete_dept: :fail,
        remove_dept: :pass,
        create_dept: :pass,
        update_dept: :pass
    }

    GenericStates = {pass: [true, :pass, :conflict], fail: [false, :fail]}

    ## setup passfail generic
    def initialize()
        @generic_config = {
            responses: GenericResponses,
            passing: GenericPassing,
            states: GenericStates,
            builder: StandardRenderers[:pass_fail]
        }
        super()
    end

    # point cats
    def get_udc_points_list_api
        pointId = params.fetch(:pointID, 0).to_s
        render :json => response_url(pointId.to_s)
    end

    def get_point_cat_list_api
        serve_default
    end

    def add_point_category
        serve_generic_pass_fail
    end

    def delete_point_category
        serve_generic_pass_fail
    end

    def update_point_category
        serve_generic_pass_fail
    end

    # punch policies

    def get_punch_policies_list_api
        serve_default
    end

    def get_accrual_policies_list_api
        serve_default
    end

    # roles

    def get_sec_rights_list_api
        id = params.fetch(:roleID,'1001')
        render :json => response_url(id)
    end

    def get_roles_list_api
        serve_default
    end

    def update_supervisor_role
        @success = true
        render 'generic.json'
    end

    def add_supervisor_role
        # @success = true
        # render 'generic.json'
        serve_generic_pass_fail
    end

    def check_supervisor_role
        serve_generic_pass_fail
    end

    def delete_supervisor_role
        serve_generic_pass_fail
    end

    # motd

    def save_motd
        @success = true
        render 'saveMOTD.json'
    end

    def get_motd
        serve_default
    end

    def restore_employee
        serve_generic_pass_fail
    end

    def get_employee_only_tree_deleted
        serve_default
    end

    def read_sti_message
        serve_default
    end

    

    # Super admin options

    def get_customer_info
        emp_id = params.fetch(:emp_id, 'default')
        render :json => response_url(emp_id)
    end

    def get_time_kron_status
        serve_generic_pass_fail
    end

    # Projects

    def get_project_list_api
        serve_default
    end

    def add_project
        serve_generic_pass_fail
    end

    def remove_project
        serve_generic_pass_fail
    end

    def update_project_information
        serve_generic_pass_fail
    end

    # holiday editor

    def get_holidays_for_year
        year = params.fetch(:rec_year, '2018')
        render :json => response_url(year)
    end

    def append_holidays_to_year
        serve_generic_pass_fail
    end

    def apply_holiday_to_employees
        serve_generic_pass_fail
    end

    def edit_holiday
        serve_generic_pass_fail
    end

    def delete_holiday
        serve_generic_pass_fail
    end

    # punch policies

    def add_punch_policy
        serve_generic_pass_fail
    end

    def remove_punch_policy
        serve_generic_pass_fail
    end

    def update_punch_policy_information
        serve_generic_pass_fail
    end

    def apply_punch_policy_to_employees
        serve_generic_pass_fail
    end

    def get_punch_policy_employees
        serve_default
    end

    # departments

    def get_supervisorsby_dept
        dept = params.fetch(:department_id, 'default')
        render :json => response_url(dept)
    end

    def get_employee_only_list_by_dept_api
        dept = params.fetch(:dept, 'default')
        render :json => response_url(dept)
    end

    def can_delete_dept
        serve_generic_pass_fail
    end

    def remove_dept
        serve_generic_pass_fail
    end

    def create_dept
        serve_generic_pass_fail
    end

    def update_dept
        serve_generic_pass_fail
    end

    
    private

    def serve_generic_pass_fail
        serve_generic
        render @builder
    end
end
