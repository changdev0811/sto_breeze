module Dummy
    ##
    # Used by concern Spoofable to inject replacement values into static response JSON
    module JsonSpoof
        extend self
        def spoof(source, spoofs, proc_params)
            jobj = Dummy::JsonObject.new(source)
            spoofs.each_pair do |path,value|
                # begin
                    if(value.is_a?(Proc))
                        value = value.call(proc_params)
                    end
                    jobj.replace(path.to_s, value)
                # rescue e
                    # printf "JsonSpoof Issue: #{e}"
                # end
            end
            return jobj.to_json
        end
    end
end