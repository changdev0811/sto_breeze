class Administrator::UdcController < GenericController

    GenericResponses = {
        # udc
        is_category_name_in_use: {
            pass: {val: false}, # TODO: fix const value
            fail: {val: true},
            builder: 'inUse.json'
        },
        update_category: {
            pass: {err:"", info: []},
            fail: {err:"Error", info: []}
        },
        remove_category: {
            pass: {err: "0", info: ["Removed category"]},
            fail: {err: "error", info: []}
        },
        create_category: {
            pass: {err: "0", info: ["Created new category"]},
            fail: {err: "Failed", info: []}
        },
        reorder_categories: {
            pass: {err: "0", info: ["Reordered"]},
            fail: {err: "Failed", info: []}
        }
    }

    GenericPassing = {
        is_category_name_in_use: :pass,
        update_category: :pass,
        remove_category: :pass,
        create_category: :pass,
        reorder_categories: :pass
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

    # udc

    def is_category_name_in_use
        # cat_id = params.fetch(:category_id, "1001")
        # render :json => response_url(cat_id)
        # serve_default
        serve_generic_pass_fail
    end

    def is_category_in_use
        serve_default
    end

    def update_category
        @success = true
        render_generic(:default)
    end

    def remove_category
        serve_generic_pass_fail
    end

    def create_category
        serve_generic_pass_fail
    end

    def reorder_categories
        serve_generic_pass_fail
    end

    def get_udc_list_api
        leave_request_only = params.fetch(:leave_request_only, 0)
        render :json => response_url(leave_request_only.to_s)
    end

    private

    def serve_generic_pass_fail
        serve_generic
        render @builder
    end

end
