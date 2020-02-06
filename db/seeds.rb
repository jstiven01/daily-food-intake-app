# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
=begin user_example = User.find(12)
nutriemt_protein = user_example.nutrients.first
5.times do |i| 
    Measurement.create(
        amount: rand(2500),
        date_intake: Faker::Date.between(from: 2.days.ago, to: Date.today) ,
        nutrient: nutriemt_protein
    )
end 
=end
