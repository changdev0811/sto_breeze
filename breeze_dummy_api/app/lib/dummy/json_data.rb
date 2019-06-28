require 'json'

module Dummy
  module JsonData

    def self.normalize_source(source)
      source.gsub('__','ZZ')
    end

    def self.restore_source(source)
      source.gsub('ZZ','__')
    end

    def self.object_from_file(filename)
      data = File.read(filename)
      JSON.parse(normalize_source)
    end

    def self.response_content(action, name, path=nil)
      if path.nil?
        File.read("./app/lib/data/#{action}/#{name}.json")
      else
        File.read("./app/lib/data/#{action}/#{path}/#{name}.json")
      end
    end

  end
end