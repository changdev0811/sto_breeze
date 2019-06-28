json.d do
    json.__type "Repository.Entities.Resp"
    json.success @success
    unless @error.nil?
        json.err @error
    else
        json.err "59e995aaa701bd44fa2a4f7a6453efea__991012__5003"
    end
    json.info []
end