class CreateEmployeePhotos < ActiveRecord::Migration[5.1]
  def change
    create_table :employee_photos do |t|
      t.string :photo
      t.string :cust_id
      t.string :emp_id
      t.string :employee_id
      t.string :extension
      t.boolean :has_picture

      t.timestamps
    end
  end
end
