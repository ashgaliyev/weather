class User < ApplicationRecord
  has_and_belongs_to_many :places, join_table: :users_places

  validates :name, presence: true

  def self.create_from_omniauth(user_info)
    create(
      name: user_info['info']['name'],
      email: user_info['info']['email'],
    )
  end
end
