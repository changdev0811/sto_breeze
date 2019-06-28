require 'active_support/concern'
module Spoofable
    extend ActiveSupport::Concern
    class_methods do |base|
        unless defined? base::Spoofs
            Spoofs = {}
        end
    end
    included do
        
        def serve_spoof(user = nil, opt = nil, action = nil)
            json = response_url(user, opt, action)
            action = params['action'] if action.nil?
            proc_params = {user: user, opt: opt, action: action, params: params}
            spoofs = self.class::Spoofs.fetch(action.to_sym,{})

            render :json => Dummy::JsonSpoof.spoof(json, spoofs, proc_params)
        end
    end
end

