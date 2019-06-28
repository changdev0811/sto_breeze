require 'json'

module Dummy
  module JbuilderConvert

    def self.load(filename)
      data = File.read(filename)
      data = data.gsub('__','ZZ')
      JSON.parse(data)
    end

    def self.tabs(count)
      "\t"*count
    end

    def self.cmd(text,level)
      "#{tabs(level)}#{text}"
    end

    def self.make_jbuilder(source)

      op = []
      tab = 0

      convert = Proc.new do |o|
        if o.is_a?(Object) || o.is_a?(Hash)
          convert_hash.call(o)
        elsif o.is_a?(Array)
          convert_array(o)
        end
      end

      convert_object = Proc.new do |o|
        o.each_pair do |k,v|
          if v.is_a?(Hash) || v.is_a?(Object)
            op << cmd("json.#{{}}")
      end

    end

    def self.to_jbuilder(json_source)
      jbt = []

      level = 0

      convert_array = Proc.new do |n,a|
        
        jbt << cmd("json.#{n} do", level)
        level += 1



      explore = Proc.new do |src|
        src.each_pair do |k,v|
          binding.pry
          if v.is_a?(Array)
            jbt << "#{tabs(level)}json.#{k} do"
            jbt << "#{tabs(level+1)}json.array [] do |a|"
            level+=2
            inner = []
            v.each do |i|
              explore.call(i)
            end
            inner -= 2
            jbt << "#{tabs(level)}end"
          elsif v.is_a?(Object)
            jbt << "#{tabs(level)}json.#{k} do"
            level += 1
            v.each do |i|
              explore.call(i)
            end
            level -= 1
            jbt << "#{tabs(level)}end"
          else
            val = v
            val = "\"#{v}\"" if val.is_a?(String)
            jbt << "#{tabs(level)}json.#{k} #{val}"
          end
        end
      end

      explore.call(json_source)
      return jbt
    end

    def self.save(name, generated)
      code = generated.join("\n")
      File.write(name, code)
    end

    def self.batch(names, path)

      names.each do |name|
        src = File.join(path,name,"default.json")
        dst = File.join(path,name,"default.jbuilder")

        json = load(src)
        jb = to_jbuilder(json)
        save(dst, jb)
      end
    end

  end
end