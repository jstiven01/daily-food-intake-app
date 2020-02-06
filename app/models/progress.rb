# frozen_string_literal: true

class Progress < ApplicationRecord
  default_scope -> { order(date_progress: :desc) }
  # Associations
  belongs_to :nutrient

  # validations
  validates_presence_of :date_progress, :units, :total_date
end
