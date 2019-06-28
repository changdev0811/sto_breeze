# Response to ForgotPassword, dynamic based on constants set in calls controller
json.d do
    json.__type "Repository.Entities.Resp"
    json.success @success
    json.err @error
end