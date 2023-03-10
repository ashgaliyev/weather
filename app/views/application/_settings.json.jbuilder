json.temp_unit current_user.temp_unit
json.map_api_key ENV['GOOGLE_MAPS_API_KEY']
json.paths do
  json.root_path root_path
  json.new_place_path new_place_path
  json.place_path place_path(":id")
  json.places_path places_path
  json.edit_place_path edit_place_path(":id")
end
