class Administrator::AccrualPoliciesController < GenericController

    GenericResponses = {
        # udc
        is_category_name_in_use: {
            pass: {val: false}, # TODO: fix const value
            fail: {val: true},
            builder: 'inUse.json'
        },
        create_accrual_policy: {
            pass: {err:"5003", info: []},
            fail: {err:"Error", info: []}
        },
        can_delete_accrual_policy: {
            pass: {err: "Name", info: ["Removed category"]},
            fail: {err: "One or more employees are currently assigned to [Policy Name]", info: []}
        },
        delete_accrual_policy: {
            pass: {err: "0", info: ["Created new category"]},
            fail: {err: "Failed", info: []}
        },
        reorder_categories: {
            pass: {err: "0", info: ["Reordered"]},
            fail: {err: "Failed", info: []}
        },
        apply_accrual_policy_progress: {
            start: {err: '1', info: [1,6]},
            work1: {err: '4', info: [4,6]},
            done: {err: '6', info: [6,6]},
            fail: {err: 'error', info: []}
        },
        save_accrual_policy: {
            pass: { err: 'Accrual Policy successfully saved', info: ['policy name']},
            fail: { err: 'Unable to save Accrual Policy (dummy error)', info: ['dummy error']}
        }
    }

    GenericPassing = {
        create_accrual_policy: :pass,
        can_delete_accrual_policy: :pass,
        delete_accrual_policy: :pass,
        create_category: :pass,
        reorder_categories: :pass,
        apply_accrual_policy_progress: :start,
        save_accrual_policy: :pass
    }

    GenericStates = {pass: [true, :pass, :start, :work1, :done], fail: [false, :fail]}

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

    def create_accrual_policy
        serve_generic_pass_fail
    end

    def can_delete_accrual_policy
        serve_generic_pass_fail
    end

    def delete_accrual_policy
        serve_generic_pass_fail
    end

    def get_accrual_policy_employees_and_categories
        serve_default
    end

    def get_accrual_policy_category
        policy = params.fetch(:schedule_id, '1001')
        category = params.fetch(:category_id, '1001')
        render :json => response_url(policy, category)
    end

    def save_accrual_policy
        serve_generic_pass_fail
    end

    def apply_accrual_policy_progress
        progress = params.fetch(:progress,6)
        
        case progress
        when 0
            swap_save_passing(:start)
        when 1
            3.delay_then { swap_save_passing(:work1) }
        when 4
            3.delay_then { swap_save_passing(:done) }
        end

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

    def response_url(user, opt=nil, action=nil)
        if action.nil?
          action = params['action']
        end
        # path = File.join(action,"#{opt}.json")
        # File.read(path)
        if opt.nil?
          Dummy::JsonData.response_content(action,user)
        else
          Dummy::JsonData.response_content(action,opt,user)
        end
    end
end