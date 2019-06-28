require 'json'
module Dummy
    ##
    # Class wrapping around Hash/JSON source file with query and replace functions
    class JsonObject
        attr_reader :object
        ##
        # Constructor
        # @param [String|Hash] source JSON source string or source hash
        def initialize(source)
            if source.is_a?(String)
                @object = JSON.load(source)
            else
                @object = JSON.load(source.to_json)
            end
        end

        ##
        # Query child by . separated path
        # @param [String] path Path separated by .
        # @return [Object] Hash or value at path
        def query(path)
            resolve_path(path)
        end
           
        ##
        # Replace value at given path
        # @param [String] path Path separated by .
        # @param [String|Hash|Number] value Value to replace matched path with
        # @throws Exception
        def replace(path, value)
            resolve_path(path, {replace: true, value: value})
        end


        def to_json()
            @object.to_json
        end

        private

        NODE_RE = /(?<prop>[^\.\[]+)(\[(?<index>([0-9]+))\])?/

        def parse_path_node(node)
            n = NODE_RE.match(node)
            
            # give back nil if match failed
            return nil if n.nil?
            
            prop, index = n.named_captures.values_at('prop','index')
            {
                name: n.named_captures['prop'],
                index: (index.nil?)? nil : index.to_i
            }
        end

        def resolve_path(path, opts={})
            replacing = opts.fetch(:replace, false)
            replace_value = opts.fetch(:value, nil)
            tmp = @object.dup
            loc = tmp
            prev = nil
            steps = path.split('.')
            step_count = steps.length
            node = nil
            steps.each_with_index do |stp,i|
                node = parse_path_node(stp)
                if loc.is_a?(Hash) && loc.has_key?(node[:name]) || (i == step_count - 1)
                    prev = loc
                    loc = loc[node[:name]]
                    unless node[:index].nil?
                        if loc.is_a?(Array) && loc.length >= node[:index]
                            prev = loc
                            loc = loc[node[:index]]
                        else
                            throw Exception.new("Resolving failed for path #{path} at #{steps[0..i].join('.')} (Not array or not large enough)")
                        end
                    end
                else
                    throw Exception.new("Resolve failed for path #{path} at #{steps[0..i].join('.')}")
                end
            end

            if replacing
                unless node[:index].nil?
                    prev[node[:index]] = replace_value
                else
                    prev[node[:name]] = replace_value
                end
            else
                loc
            end     
        end

    end
end