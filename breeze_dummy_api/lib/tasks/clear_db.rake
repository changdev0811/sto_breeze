##
# Rake task to quickly clear out db data and files
# created in public/uploads by carrierwave 
namespace :data do
  desc "Clear all database records and uploaded files"
  task clear: :environment do
    records = EmployeePhoto.all
    records.each {|r| r.destroy}
  end
end
