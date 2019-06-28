json.d do
    json.EmployeeName "Person, Randomized"
    json.DepartmentName "Randomized Department"
    json.HireDate "5/01/2018"
    json.Rows do
        json.array! @rows do |r|
            json.CatID r[:CatID]
            json.CatColor r[:CatColor]
            json.CatDesc r[:CatDesc]
            json.CalType r[:CalType]
            json.CatRecorded r[:CatRecorded]
            json.CatAllowed r[:CatAllowed]
            json.CatRemaining r[:CatRemaining]
            json.IsAllowed r[:IsAllowed]
        end
    end
    json.Points nil
end