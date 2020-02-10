class CreateProgresses < ActiveRecord::Migration[5.2]
  def change
    create_table :progresses do |t|
      t.datetime :date_progress
      t.float :total_date
      t.string :units
      t.references :nutrient, foreign_key: true

      t.timestamps
    end
  end
end
