# frozen_string_literal: true

class User < ApplicationRecord
  has_many :places, dependent: :destroy

  validates :name, presence: true

  def self.create_from_omniauth(user_info)
    create!(name: user_info["info"]["name"], email: user_info["info"]["email"])
  end

  def add_place(place)
    places << place
  end

  def save_places(ids)
    return if ids.nil?

    saved_ids = places.ids
    self.places = Place.where(id: (ids + saved_ids).uniq)
  end

  def update_temp_unit(temp_unit)
    update(temp_unit:)
  end
end
