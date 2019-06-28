# generic response built from pass_fail config with retVal
json.d do
    json.success @success
    json.err @data[:err]
    json.info @data[:info]
    json.retVal @data[:retVal]
end