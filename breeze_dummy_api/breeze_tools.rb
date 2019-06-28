require 'json'
module BreezeTools
    def self.extract_tree_data(tree_file, out_file, base="d")
        src = File.read(tree_file)
        json = JSON.load(src)
        items=[]
        pull_data = Proc.new do |d|
            if d.has_key?("data") && !d["data"].nil?
                items.push(JSON.load(d["data"]))
            end
        end
        traverse = Proc.new do |dat|
            dat.each do |i|
                pull_data.call(i)
                if i.has_key?(base) && !i[base].nil?
                    traverse.call(i[base])
                end
            end
        end
        traverse.call(json[base])
        File.write(
            out_file,
            {data: items}.to_json
        )
    end
end