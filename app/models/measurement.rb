# frozen_string_literal: true

class Measurement < ApplicationRecord
  after_create :update_nutrient_progress
  after_save :update_nutrient_progress
  after_destroy :update_nutrient_progress
  belongs_to :nutrient
  default_scope -> { order(created_at: :desc) }

  validates_presence_of :date_intake, :amount

  def update_nutrient_progress
    # nutrient = Nutrient.find(nutrient_id)
    sum_measurements = nutrient.measurements.where('DATE(date_intake) = ?', date_intake).sum(:amount)
    nutrient.update_attributes(total_nutrient: sum_measurements, date_progress: date_intake)
    progress = nutrient.progresses.find_by(date_progress: date_intake)
    if progress
      progress.update_attributes(total_date: sum_measurements)
    else
      nutrient.progresses.create!(date_progress: date_intake, total_date: sum_measurements,
                                  units: nutrient.units)
    end
  end
end
