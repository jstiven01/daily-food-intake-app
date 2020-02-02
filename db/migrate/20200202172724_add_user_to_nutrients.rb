class AddUserToNutrients < ActiveRecord::Migration[5.2]
  def change
    add_reference :nutrients, :user, foreign_key: true
  end
end
