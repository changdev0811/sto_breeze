def build_routes(data)
    type_re = (/case\s\'(?<name>[a-zA-Z0-9^\']+)\'/)
    view_re = (/ns\s=\s\'(?<view>[A-Za-z0-9\.^\']+)\';/)
    rows = [:type, :view, :end, :blank]
    routes = []
    create_route = Proc.new do |parts|
        type = type_re.match(parts[:type]).named_captures["name"]
        view = view_re.match(parts[:view]).named_captures["view"]
        {
            type: type,
            view: view
        }
    end
    next_row = Proc.new do |current|
        rows[(rows.index(current)+1)%rows.length]
    end
    
    mem = {:type => nil, :view => nil}
    row = rows[0]
    route = nil

    data.each do |ln|
        case row
        when :type, :view
            mem[row] = ln
        when :end
            route = create_route.call(mem)
            routes.append(route)
        end
        row = next_row.call(row)
    end
    routes
end