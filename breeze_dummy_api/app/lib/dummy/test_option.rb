module Dummy
    ##
    # Super simple test option module making it easy to toggle responses
    # for controller methods from two hashes
    module TestOption

        DYNAMIC_PARAM_RE = /%P\((?<q1>['"]{0,1})(?<n>[^'"\)]+)['"]{0,1}\)/

        def self.resolve(responses, cfg, action, params={})
            act_key = action.to_sym
            r = responses.fetch(act_key, nil)
            unless r.nil?
                r[cfg[act_key]]
            else
                nil
            end
        end

        # def self.detect_param(params)
        #     seek = Proc.new do |h|
        #         seek.each_pair do |k,v|

        # end

    end
end
