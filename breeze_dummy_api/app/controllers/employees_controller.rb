class EmployeesController < GenericController

    Resp = {
        can_delete_employee: {
            pass: { 
                success: true, err: nil, info: [] 
            },
            fail: { 
                success: false,
                err: 'You are not authorized.',
                info: []
            }
        },
        delete_employee: {
            pass: {
                success: true, err: 'Deleted, Some Person was deleted',
                info: [
                    'Some Body deleted Someone Else.'
                ]
            },
            fail: {
                success: false, err: 'error', info: []
            }
        },
        get_emp_shift_time: {
            minutes: 0,
            schedule_id: 1001,
            recording_mode: 21
        }
    }

    RespConfig = {
        can_delete_employee: :pass,
        delete_employee: :pass,
        # set to :percent to use percent mode, anything else to use default
        get_emp_shift_time: :hours
    }

    GenericResponses = {
        check_username: {
            pass: { err: 'Available', info: []},
            fail: {err: 'Username unavailable', info: []}
        }
    }

    GenericPassing = {
        check_username: :pass
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

    def check_username
        serve_generic_pass_fail
    end


    def can_delete_employee
        serve_options
    end

    def delete_employee
        serve_options
    end

    def get_department_staff
        department_id = params.fetch(:department_id, 'default')
        serve_response(department_id)
    end

    def get_emp_shift_time
        @data = Resp[:get_emp_shift_time].dup
        if RespConfig[:get_emp_shift_time] == :percent
            @data[:recording_mode] = 22
        end
        render "shiftTime.json"
    end

    private

    def serve_options
        act = params['action']
        @data = Dummy::TestOption.resolve(Resp, RespConfig, act)
        render "genericOption.json"
    end

end
