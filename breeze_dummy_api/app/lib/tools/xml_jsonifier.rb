require 'nokogiri'
require 'json'

class XmlJsonifier

    attr_accessor :data

    def initialize(filename)
        @source = File.read(filename)
        @dom = Nokogiri.parse(@source)
        @data = {}
    end

    def process()
        @data = {}
        base = @dom.document.root
        

        traverse = Proc.new do |elem, dat|
            unless elem.name == 'text'
                if dat.is_a?(Array)
                    d = {}
                    dat << d
                    dat = dat.last
                end
                if elem.children.length == 1 and elem.children[0].name == 'text'
                    dat[elem.name] = elem.children[0].to_s
                elsif elem.children.length > 0
                    loc = nil
                    if !is_multi(elem.parent, elem.name)
                        dat[elem.name] = []
                        loc = dat[elem.name]
                    else
                        dat[elem.name] = {}
                        loc = dat[elem.name]
                    end
                    elem.children.each do |c|
                        traverse.call(c, loc)
                    end
                end
            end
        end


        traverse.call(base, @data)
    end

    def is_multi(node, name)
        names = node.children.map{|n| (n.name=='text')? nil : n.name}.compact.select{|z| z == name }
        return names.length > 1
    end



end

