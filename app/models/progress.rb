# frozen_string_literal: true

class Progress < ApplicationRecord
  # Associations
  belongs_to :nutrient

  # validations
  validates_presence_of :date_progress, :units, :total_date
end
