module Dummy
    module Delayed
        def self.delay_then(duration, action)
            sleep (duration)
            action.call()
        end
    end
end
class Float
    def delay_then(&block)
        Dummy::Delayed.delay_then(self, Proc.new { yield block } )
    end
end
class Integer
    def delay_then(&block)
        Dummy::Delayed.delay_then(self, Proc.new { yield block } )
    end
end