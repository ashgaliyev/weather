class User < ApplicationRecord
  has_and_belongs_to_many :places, join_table: :users_places

  validates :name, presence: true
end
