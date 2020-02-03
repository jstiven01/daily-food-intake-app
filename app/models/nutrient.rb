# frozen_string_literal: true

class Nutrient < ApplicationRecord
  # validations
  validates_presence_of :name, :units, :date_progress

  # Associations
  has_many :measurements, dependent: :destroy
end