# frozen_string_literal: true

class RemoveUsersPlaces < ActiveRecord::Migration[6.1]
  def change
    drop_table(:users_places)
  end
end
