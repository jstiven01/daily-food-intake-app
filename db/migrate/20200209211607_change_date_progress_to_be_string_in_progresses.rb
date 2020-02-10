class ChangeDateProgressToBeStringInProgresses < ActiveRecord::Migration[5.2]
  def change
    change_column :progresses, :date_progress, :string
  end
end
