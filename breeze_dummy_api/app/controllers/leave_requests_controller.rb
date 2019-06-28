class LeaveRequestsController < GenericController
=begin
    # Sample generic responses:
    is_category_name_in_use: {
        pass: {val: false}, # TODO: fix const value
        fail: {val: true},
        builder: 'inUse.json'
    },
    apply_accrual_policy_progress: {
        start: {err: '1', info: [1,6]},
        work1: {err: '4', info: [4,6]},
        done: {err: '6', info: [6,6]},
        fail: {err: 'error', info: []}
    },
=end
    GenericResponses = {
        # create_accrual_policy: {
        #     pass: {err:"5003", info: []},
        #     fail: {err:"Error", info: []}
        # },
        # request days
        add_leave_request_day: {
            pass: {err: nil, info: []},
            fail: {err: 'Error message', info:[]}
        },
        
        delete_leave_request_day: {
            pass: {err: '', info: []},
            fail: {err: 'Failed', info: []}
        },
        validate_leave_request_day: {
            pass: { err: nil, info: [], retVal: 0 },
            fail: { err: 'Generic error message', info: [], retVal: 0 }
        },
        # leave request generic
        create_leave_request: {
            pass: { err: '100', info: ['100']},
            fail: {err: 'Unknown error', info: []}
        },
        delete_leave_request: {
            pass: {err: '', info: []},
            fail: {err: 'Failed', info: []}
        },        
        update_leave_request_event: {
            pass: { err: 'Update completed successfully.', info: [], retVal: 0 },
            fail: { err: 'Update failed', info: []}
        },
        # employees
        employee_rename_leave_request: {
            pass: { err:'New Name', info:[]},
            fail: {err: 'Error occured', info: []}
        },
        employee_leave_request_change_notes: {
            pass: { err:'New Name', info:[]},
            fail: {err: 'Error occured', info: []}
        },
        employee_cancel_leave_request: {
            pass: {err: '', info: []},
            fail: { err: 'Failed', info: []}
        },
        employee_submit_leave_request: {
            pass: { err: 'Complete. Emailed 1 supervisors', info: [] },
            fail: { err: 'Error occurred', info: []}
        },

        

    }

    GenericPassing = {
        # create_accrual_policy: :pass,
        create_leave_request: :pass,
        delete_leave_request: :pass,
        employee_leave_request_change_notes: :pass,
        employee_rename_leave_request: :pass,
        employee_cancel_leave_request: :pass,
        employee_submit_leave_request: :pass,
        update_leave_request_event: :pass,
        add_leave_request_day: :pass,
        delete_leave_request_day: :pass,
        validate_leave_request_day: :pass
    }

    GenericStates = {pass: [true, :pass], fail: [false, :fail]}

    ## setup passfail generic
    def initialize()
        @generic_config = {
            responses: GenericResponses,
            passing: GenericPassing,
            states: GenericStates,
            # builder: 'genericPassFail.json'
            builder: StandardRenderers[:pass_fail]
        }
        super()
    end

 
    def get_leave_requestsfor_employee
        serve_default
    end

    def get_leave_request_days
        request_id = params.fetch(:request_id, 1)
        serve_response(request_id)
    end

    def create_leave_request
        serve_generic_pass_fail
    end

    def delete_leave_request
        serve_generic_pass_fail
    end

    def add_leave_request_day
        serve_generic_pass_fail
    end

    def delete_leave_request_day
        serve_generic_pass_fail
    end

    def employee_leave_request_change_notes
        serve_generic_pass_fail
    end

    def employee_rename_leave_request
        serve_generic_pass_fail
    end

    def employee_cancel_leave_request
        serve_generic_pass_fail
    end

    def employee_submit_leave_request
        serve_generic_pass_fail
    end

    def update_leave_request_event
        serve_generic_pass_fail
    end

    def validate_leave_request_day
        serve_generic_pass_fail
    end

    private

    def swap_save_passing(state)
        GenericPassing[:apply_accrual_policy_progress] = state
    end

    def serve_generic_pass_fail
        serve_generic
        render @builder
    end
end
