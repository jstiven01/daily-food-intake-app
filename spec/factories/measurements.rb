require 'faker'
FactoryGirl.define do
  factory :measurement do
    amount { rand(2500) }
    date_intake { Faker::Date.between(from: 2.days.ago, to: Date.today) }
    nutrient_id nil
  end
end
