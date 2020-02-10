class ChangeMeasurement < ActiveRecord::Migration[5.2]
  def change
    rename_column :measurements, :measurement, :amount
  end
end
