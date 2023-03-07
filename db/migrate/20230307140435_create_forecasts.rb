class CreateForecasts < ActiveRecord::Migration[6.1]
  def change
    create_table :forecasts do |t|
      t.float :lat
      t.float :lng
      t.json :current
      t.json :five_days

      t.timestamps
    end

    add_reference :places, :forecast, foreign_key: true
  end
end
