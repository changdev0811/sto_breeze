json.d do
    json.success @success
    if @success
        json.err ""
        json.info nil
    else
        json.err "Error saving MOTD!"
        json.info ['Additional error information']
    end
end