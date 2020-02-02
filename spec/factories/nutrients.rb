# frozen_string_literal: true

require 'faker'
FactoryGirl.define do
  factory :nutrient do
    name { %w[Protein Carbs Fat][rand(3)] }
    units 'grams'
    total_nutrient { rand(2500) }
    date_progress { Faker::Date.between(from: 2.days.ago, to: Date.today) }
  end
end
