# generic response built from pass_fail config
json.d do
    json.success @success
    json.err @data[:err]
    json.info @data[:info]
    # Defined by some calls, e.g. updateLeaveRequestDays
    if @data.has_key?(:retVal)
        json.retVal @data[:retVal]
    end
end