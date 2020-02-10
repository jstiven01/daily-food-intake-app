# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user_example = User.create!(name:  "Example User",
    email: "example@reactrails.org",
    password:              "foobar",
    password_confirmation: "foobar")

user_example.nutrients.create!(name: "Protein", units: "grams", 
total_nutrient: 0, date_progress: Time.now.iso8601)
user_example.nutrients.create!(name: "Carbs", units: "grams", 
    total_nutrient: 0, date_progress: Time.now.iso8601)
user_example.nutrients.create!(name: "Fat", units: "grams", 
    total_nutrient: 0, date_progress: Time.now.iso8601)

user_example.nutrients.each do |nutrient|
    10.times do |i| 
        Measurement.create!(
            amount: rand(1..20),
            date_intake: (Time.now - (10-i).days).iso8601 ,
            nutrient: nutrient
        )
    end 
end





