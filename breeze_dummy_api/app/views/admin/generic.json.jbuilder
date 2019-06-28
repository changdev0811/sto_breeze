json.d do
    json.success @success
    if @success
        json.err nil
        json.info []
    else
        json.err 'Some error'
        json.info []
    end
end