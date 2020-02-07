# frozen_string_literal: true

class Nutrient < ApplicationRecord
  default_scope -> { order(name: :desc) }
  # validations
  validates_presence_of :name, :units, :date_progress

  # Associations
  has_many :measurements, dependent: :destroy
  has_many :progresses, dependent: :destroy
end
