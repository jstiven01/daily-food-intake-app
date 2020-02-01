class CreateTrackings < ActiveRecord::Migration[5.2]
  def change
    create_table :trackings do |t|
      t.string :type_nutrient
      t.string :units
      t.float :total_nutrient
      t.float :left_nutrient
      t.float :goal_nutrient
      t.datetime :date_intake
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
