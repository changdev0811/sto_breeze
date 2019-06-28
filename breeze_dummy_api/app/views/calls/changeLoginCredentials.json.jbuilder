json.d do
    json.success @success
    if @success
        json.username @username
        json.err 'Success'
    else
        json.err 'Password is the same'
    end
end