module Dummy
    module Matching
        def self.find_nth(array, n, regex)
            idx = -1
            itm = 0
            c = 0
            while c < n && !itm.nil?
                idx = idx + 1
                itm = array[idx..-1].find_index{|l| !regex.match(l).nil? }
                unless itm.nil?
                    idx = idx + itm
                    c = c + 1
                end
            end
            if itm.nil?
                nil
            else
                idx
            end
        end

        def self.find_last_nth(array, n, regex)
            z = find_nth(array.reverse, n, regex)
            if z.nil?
                z
            else
                array.length - (z+1)
            end
        end

        def self.test_find_nth()
            data = ['a','b','a','c','a','r']
            last = find_nth(data, 3, /a/)
            if last == 4
                print "worked #{last}"
            else
                print "failed #{last}"
            end
        end
    end
end

