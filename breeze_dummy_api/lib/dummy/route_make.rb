module Dummy
  module RouteMake
    def self.underscore(str)
      str.gsub(/::/, '/').
      gsub(/([A-Z]+)([A-Z][a-z])/,'\1_\2').
      gsub(/([a-z\d])([A-Z])/,'\1_\2').
      tr("-", "_").
      downcase
    end
  
    def self.make(name)
      return make_multi(name) if name.is_a?(Array)
      "post '#{name}' => 'calls\##{underscore(name)}', defaults: {format: :json}"
    end

    def self.make_multi(names)
      names.map{|n| make(n)}
    end

  end
end