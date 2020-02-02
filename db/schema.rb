# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_02_172724) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "measurements", force: :cascade do |t|
    t.float "amount"
    t.string "date_intake"
    t.bigint "nutrient_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["nutrient_id"], name: "index_measurements_on_nutrient_id"
  end

  create_table "nutrients", force: :cascade do |t|
    t.string "name"
    t.float "total_nutrient"
    t.string "units"
    t.datetime "date_progress"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_nutrients_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "measurements", "nutrients"
  add_foreign_key "nutrients", "users"
end
