json.d do
    json.Success true
    json.Content do
        json.array! @content do |c|
            json.TotalPages c[:pages]
            json.CurrentPage c[:current]
            json.CurrentPageContent c[:content]
            json.CurrentPageURL 'someurl.pdf'
        end
    end
end