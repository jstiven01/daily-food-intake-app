class CreateMeasurements < ActiveRecord::Migration[5.2]
  def change
    create_table :measurements do |t|
      t.float :measurement
      t.string :date_intake
      t.references :nutrient, foreign_key: true

      t.timestamps
    end
  end
end
