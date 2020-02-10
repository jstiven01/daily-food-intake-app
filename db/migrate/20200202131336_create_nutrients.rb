class CreateNutrients < ActiveRecord::Migration[5.2]
  def change
    create_table :nutrients do |t|
      t.string :name
      t.float :total_nutrient
      t.string :units
      t.datetime :date_progress

      t.timestamps
    end
  end
end
