class CreateMeasurements < ActiveRecord::Migration[5.2]
  def change
    create_table :measurements do |t|
      t.time :time
      t.float :serving_size
      t.string :name_food
      t.string :type_meal
      t.references :tracking, foreign_key: true

      t.timestamps
    end
  end
end
