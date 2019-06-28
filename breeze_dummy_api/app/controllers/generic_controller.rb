##
# Extension of ApplicationController with generic pass/fail
class GenericController < ApplicationController
    StandardRenderers = {
        default: './layouts/generic.json',
        pass_fail: './layouts/genericPassFail.json',
        simple: './layouts/simple.json'
    }

    @generic_config = {
        responses: {},
        passing: {},
        states: {pass: [true, :pass], fail: [false, :fail]},
        builder: 'generic.json'
    }
    
    ##
    # Serve generic pass/fail by pulling response info
    # from generic_config[responses] for state pulled from
    # generic_config[states]. JBuilder is either generic_config[builder],
    # or action/action+state specific builder
    def serve_generic()
        # binding.pry
        action=detect_action
        c=@generic_config
        passing = c[:passing][action]
        @success = c[:states][:pass].include?(passing)
        data = c[:responses][action][passing].dup
        @data = data.dup
        
        if @data.is_a?(Hash)
            @data.delete(:builder)
        else
            data = {value: data}
        end
        @builder = data.fetch(
            :builder, c[:responses][action].fetch(
                :builder, c[:builder]
            )
        )
    end

    def serve_generic_pass_fail
        serve_generic
        render @builder
    end

    # def generic_init(opts={})
    #     # binding.pry
    #     # GenericResponses = {} unless defined? GenericResponses
    #     # GenericPassing = {} unless defined? GenericPassing
    #     {
    #         responses: opts.fetch(:responses, GenericResponses),
    #         passing: opts.fetch(:passing, GenericPassing),
    #         states: opts.fetch(:states, {pass: [true, :pass], fail: [false, :fail]}),
    #         builder: opts.fetch(StandardRenderers[:pass_fail])
    #     }
    # end

    private

    def detect_action
        if params.has_key?('action')
            params['action'].to_sym
        else
            nil
        end
    end

    ##
    # Perform render response using shared response jbuilder template
    # @param [symbol] which Response template name (from StandardRenderers)
    def render_generic(which = :pass_fail)
        render StandardRenderers[which]
    end
    

    # def detect_generic_serve_method(response, state)
    #     serve_method = :builder
    #     info = nil

    #     method_check = Proc.new { |rsp| 
    #         m=[:builder,:fixture].select{|k|rsp.keys.include?(k)}[0]
    #     }

    #     if response[state].is_a?(Hash)
    #         serve_method = method_check.call(response[state])
    #     else
    #         serve_method = method_check.call()
            

end
