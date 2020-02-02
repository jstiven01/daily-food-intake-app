# frozen_string_literal: true

class Measurement < ApplicationRecord
  belongs_to :nutrient

  validates_presence_of :date_intake, :amount
end
