class ChangeDateProgressToBeStringInNutrients < ActiveRecord::Migration[5.2]
  def change
    change_column :nutrients, :date_progress, :string
  end
end
