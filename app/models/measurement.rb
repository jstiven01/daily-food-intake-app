class Measurement < ApplicationRecord
  after_create :update_nutrient_progress
  after_save :update_nutrient_progress
  after_destroy :update_nutrient_progress
  belongs_to :nutrient
  default_scope -> { order(created_at: :desc) }

  validates_presence_of :date_intake, :amount

  def update_nutrient_progress
    sum_measurements = sum_measures
    progress = nutrient.progresses.where('DATE(date_progress) = ?', date_intake.to_time.beginning_of_day)
    if !progress.empty?
      progress[0].update_attributes!(total_date: sum_measurements)
      if progress[0].date_progress == nutrient.date_progress
        nutrient.update_attributes!(total_nutrient: sum_measurements)
      end
    else
      nutrient.update_attributes!(total_nutrient: sum_measurements,
                                  date_progress: date_intake.to_time.beginning_of_day.iso8601)
      nutrient.progresses.create!(date_progress: date_intake.to_time.beginning_of_day.iso8601,
                                  total_date: sum_measurements, units: nutrient.units)
    end
  end

  private

  def sum_measures
    get_measurements = nutrient.measurements.where('DATE(date_intake) >= ?', date_intake.to_time.beginning_of_day)
    sum_measurements = 0.0
    if get_measurements.empty?
      sum_measurements = amount
    else
      get_measurements.each do |msm|
        if msm.date_intake.to_time.beginning_of_day == date_intake.to_time.beginning_of_day
          sum_measurements += msm.amount
        end
      end
    end
    sum_measurements
  end
end
