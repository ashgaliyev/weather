class CreateUserPlaces < ActiveRecord::Migration[6.1]
  def change
    create_table :users_places, id: false do |t|
      t.belongs_to :user
      t.belongs_to :place
    end
  end
end
