# frozen_string_literal: true

class AddTempUnitToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column(:users, :temp_unit, :string, default: "c")
  end
end
