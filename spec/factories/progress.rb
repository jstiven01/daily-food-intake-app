# frozen_string_literal: true

require 'faker'
FactoryGirl.define do
  factory :progress do
    units 'grams'
    total_date { rand(2500) }
    date_progress { Faker::Date.between(from: 5.days.ago, to: Date.today) }
    nutrient_id nil
  end
end
