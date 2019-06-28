require 'json'

module Dummy
  module JsonConvert

    def self.underscore(str)
      str.gsub(/::/, '/').
      gsub(/([A-Z]+)([A-Z][a-z])/,'\1_\2').
      gsub(/([a-z\d])([A-Z])/,'\1_\2').
      tr("-", "_").
      downcase
    end

    def self.convert(source, json=true)
      data = File.read(source)
      data = data.gsub('__','ZZ')
      if json
        JSON.parse(data)
      else
        return data
      end
    end

    def self.save(name, data)
      code = '#{name} = #{data.to_s}'
      File.open('#{name}_json.rb','w'){|f| f.write(code) }
    end

    def self.batch(sources)
      converts = {}
      sources.each_pair do |name,path|
        data = convert(path)
        converts[underscore(name)] = data
      end
      converts.each_pair do |name,data|
        save('#{name}.rb',data)
      end
    end

    ##
    # Load json from string, array, file, or hash
    # @param {[String,Array,Hash]} source Source
    # @return {Object} JSON object
    def self.smart_load(source)
      if source.is_a?(Array)
        source = source.join("")
      end
      if source.is_a?(String)
        if source.include?('{')
          return JSON.load(source)
        else
          return JSON.load(
            File.read(source)
          )
        end
      elsif source.is_a?(Hash)
        return JSON.load(
          source.to_json
        )
      end
    end

    def self.jrebuilder(source, dest_file)
      json = JsonConvert.smart_load(source)
      output = []; indent = 0
      write = Proc.new do |v|
        output.push(
          "\t" * indent + v
        )
      end
      
      process_block = Proc.new do |nm,blk|
        write.call("json.#{nm} do")
        indent += 1

        blk.each_pair do |n,v|
          if v.is_a?(Array)
            write.call("json.#{n} #{v.to_s}")
          elsif v.is_a?(Hash)
            process_block.call(n,v)
          elsif v.is_a?(String)
            write.call("json.#{n} \"#{v}\"")
          else
            write.call("json.#{n} #{v}")
          end
        end

        indent -= 1
        write.call("end")
      end
      
      json.each_pair do |n,v|
        process_block.call(n,v)
      end
        
      File.write(dest_file, output.join("\n"))
    end
  end
end