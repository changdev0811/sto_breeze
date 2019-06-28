## String extension to snake case
class String
    def snake
        self.gsub(/([A-Z]+)([A-Z][a-z])/,'\1_\2').
        gsub(/([a-z\d])([A-Z])/,'\1_\2').
        tr("-","_").downcase
    end
end
class Array
    def find_last_nth(n, regex)
        s = self.dup.reverse
        idx = -1
        itm = 0
        c = 0
        while c < n && !itm.nil?
            idx = idx + 1
            itm = s[idx..-1].find_index{|l| !regex.match(l).nil?}
            unless itm.nil?
                idx = idx + itm
                c = c + 1
            end
        end
        if itm.nil?
            -1
        else
            self.length - (idx + 1)
        end
    end
end
## Route updater
class RoutePlotter
    SCOPE_MODULE_RE = {
        start: proc { |name|
            Regexp.compile(
                [
                    '(?<tabs>[\s\t]*)scope module\:[\s\t]+',
                    "'#{name}'", 
                    '[\s\t]+do'
                ].join('')
            )
        },
        end: /[\s\t]*end/
    }
    TEMPLATES = {
        route: proc do |call,controller,name,indent|
            tabs = "\t" * indent
            "#{tabs}post '#{call}' => '#{controller}##{name}', defaults: {format: :json}"
        end
    }
    def initialize
        @code = File.read('config/routes.rb').split("\n")
    end

    def create_scope_module_block(name)
        last_end = @code.find_last_nth(2,/[\s\t]*end/)
        @code.insert(last_end, "\t\tscope module: '#{name}' do")
        @code.insert(last_end + 1, "\t\tend")
        
        {
            start: last_end,
            end: last_end+1,
            tabs: 3
        }
    end

    def locate_scope_module_block(name)
        re = SCOPE_MODULE_RE[:start].call(name)
        starts = @code.select{|l| !re.match(l).nil?}
        if starts.length == 0
            return create_scope_module_block(name)
        end

        starts_ex = re.match(starts[0])
        line = @code.index(starts[0])

        end_line = line
        while SCOPE_MODULE_RE[:end].match(@code[end_line]).nil? && end_line < @code.length
            end_line = end_line + 1
        end

        return {
            start: line,
            end: end_line,
            tabs: starts_ex.named_captures["tabs"].length-1
        }
    end

    def has_controller_call?(call, controller)
        call = call.snake()
        m = @code.select{|i| !i.index("#{controller}##{call}").nil? }
        (m.length > 0)
    end

    def add_route(call, controller)
        # target_line = @code.find_index {|i| i.strip == "end"}
        target_line = @code.find_last_nth(2,/[\s\t]*end/)
        # target_line -= @code.length + 1
        call_name = call.snake()
        route = "\t\tpost '#{call}' => '#{controller}##{call_name}', defaults: {format: :json}"
        @code.insert(target_line, route)
    end

    def add_module_route(scope_module, call, controller)
        block = locate_scope_module_block(scope_module)
        if block.nil?
            # return false
            block = create_scope_module_block(scope_module)
        end
        route = TEMPLATES[:route].call(
            call, controller, call.snake(), block[:tabs]
        )
        
        @code.insert(block[:end], route)
        return true
    end

    def save
        FileUtils.cp('config/routes.rb','config/routes.rb.bak')
        File.write('config/routes.rb', @code.join("\n"))
    end
end

##
# Rake tasks related to API calls
namespace :calls do
    desc "Create dir structure and route for new API call"
    task :add, [:call_name, :controller, :skip_json, :module] do |t, args|
        if !(args.has_key?(:controller) && args.has_key?(:call_name))
            print "Requires 2 arguments: call name and controller\n"
        else
            name = args[:call_name]
            controller = args[:controller]
            skip_json = args.fetch(:skip_json, false)
            if skip_json.is_a?(String)
                skip_json = ({'true' => true, 'false' => false})[skip_json]
            end
            scope_module = args.fetch(:module, nil)

            data_path = File.join('app','lib','data',name.snake())
            if skip_json
                print "\tSkipping directory and JSON generation\n"
            else
                unless Dir.exist?(data_path)
                    print "\tCreating data directory at #{data_path}... "
                    Dir.mkdir(data_path)
                    print " Done!\n"
                else
                    print ">\tData directory #{data_path} already exists! Aborting.\n"
                end
                unless File.exist?(File.join(data_path, 'default.json'))
                    print "\tCreating empty default.json... "
                    File.write(File.join(data_path, 'default.json'), '{ }')
                    print " Done!\n"
                else
                    print ">\tFile default.json already exists! Aborting.\n"
                end
            end

            plotter = RoutePlotter.new
            unless plotter.has_controller_call?(name, controller)
                print "\tAdding route... "
                if scope_module.nil?
                    plotter.add_route(name, controller)
                else
                    r = plotter.add_module_route(scope_module, name, controller)
                    unless r
                        print "Unable to locate module block '#{scope_module}'. Aborting!\n"
                    end
                end
                plotter.save()
                print " Done!\n"
            else
                print ">\troutes.rb already contains route for #{name.snake} in #{controller}. Aborting\n"
            end
        end
    end
end