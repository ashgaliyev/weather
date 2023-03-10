class User < ApplicationRecord
  has_and_belongs_to_many :places, join_table: :users_places

  validates :name, presence: true

  def self.create_from_omniauth(user_info)
    create(
      name: user_info['info']['name'],
      email: user_info['info']['email'],
    )
  end

  def save_places(ids)
    return if ids.nil?
    saved_ids = places.pluck(:id)
    self.places = Place.where(id: (ids + saved_ids).uniq)
  end

  def update_temp_unit(temp_unit)
    update(temp_unit: temp_unit)
  end
end
