# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Planet.destroy_all
Scientist.destroy_all
Mission.destroy_all

p1 = Planet.create(name: "Pluto", distance_from_earth: "2000 km", nearest_star: "Genesis", image: "https://cdn.uanews.arizona.edu/s3fs-public/images/uanow/Pluto_UANow%20thmb.jpg")
p2 = Planet.create(name: "Saturn", distance_from_earth: "300 km", nearest_star: "Jenna", image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2F0dXJufGVufDB8fDB8fA%3D%3D&w=1000&q=80")
p3 = Planet.create(name: "Jupiter", distance_from_earth: "700 km", nearest_star: "Nasca", image: "https://cdn.britannica.com/66/155966-131-17B5B518/Jupiter.jpg")

s1 = Scientist.create(name: "Anita", field_of_study: "Pluto Specialist", avatar: "https://thumbs.dreamstime.com/b/female-avatar-icon-women-clipart-png-vector-girl-avatar-women-clipart-bor-bisiness-icon-png-vector-233362315.jpg")
s2 = Scientist.create(name: "James", field_of_study: "Pluto Specialist", avatar: "https://img.freepik.com/premium-vector/portrait-young-man-with-beard-hair-style-male-avatar-vector-illustration_266660-423.jpg?w=2000")
s3 = Scientist.create(name: "Danielle", field_of_study: "Moon Specialist", avatar: "https://thumbs.dreamstime.com/b/female-avatar-profile-picture-vector-female-avatar-profile-picture-vector-102690279.jpg")

m1 = Mission.create(name: "Find the stars", scientist_id: s1.id, planet_id: s2.id, length_in_days: 30)
m2 = Mission.create(name: "Run in Space", scientist_id: s3.id, planet_id: s1.id, length_in_days: 45)
m3 = Mission.create(name: "Crater Hater", scientist_id: s2.id, planet_id: s3.id, length_in_days: 20)