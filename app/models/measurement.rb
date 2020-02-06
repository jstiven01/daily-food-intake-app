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
    sum_measurements = nutrient.measurements.where('DATE(created_at) = ?', Date.today).sum(:amount)
    nutrient.update_attributes(total_nutrient: sum_measurements, date_progress: Date.today)
    progress = nutrient.progresses.find_by(date_progress: Date.today)
    if progress
      progress.update_attributes(total_date: sum_measurements)
    else
      nutrient.progresses.create!(date_progress: Date.today, total_date: sum_measurements,
                                  units: nutrient.units)
    end
  end
end
