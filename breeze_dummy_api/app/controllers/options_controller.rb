class OptionsController < ApplicationController
    
    def type_option_code_list
        code = params.fetch(:code_type_id, 'default')
        code = code.to_s
        render :json => response_url(code)
    end

    def get_years
        serve_default
    end

    def get_time_zone_list
        serve_default
    end

    private

    def serve_default
        render :json => response_url('default')
    end
end