# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_03_08_102330) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "forecasts", force: :cascade do |t|
    t.float "lat"
    t.float "lng"
    t.json "current"
    t.json "five_days"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "places", force: :cascade do |t|
    t.string "name", null: false
    t.float "lat", null: false
    t.float "lng", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "forecast_id"
    t.index ["forecast_id"], name: "index_places_on_forecast_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email"
  end

  create_table "users_places", id: false, force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "place_id"
    t.index ["place_id"], name: "index_users_places_on_place_id"
    t.index ["user_id"], name: "index_users_places_on_user_id"
  end

  add_foreign_key "places", "forecasts"
end