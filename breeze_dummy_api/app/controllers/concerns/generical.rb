require 'active_support/concern'
module Generical
    extend ActiveSupport::Concern
    # class_methods do
    # class << self
    # #module ClassMethods
    class_methods do |base|
        unless defined? base::GenericResponses
            GenericResponses = {}
        end
        unless defined? base::GenericPassing
            GenericPassing = {}
        end
    end
    included do |base|
        def generic_init(opts={})
            {
                responses: opts.fetch(:responses, self.class::GenericResponses),
                passing: opts.fetch(:passing, self.class::GenericPassing),
                states: opts.fetch(:states, {pass: [true, :pass], fail: [false, :fail]}),
                builder: opts.fetch(:builder,self.class::StandardRenderers[:pass_fail])
            }
        end
    end
end