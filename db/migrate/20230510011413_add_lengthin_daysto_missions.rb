class AddLengthinDaystoMissions < ActiveRecord::Migration[7.0]
  def change
    add_column :missions, :length_in_days, :integer
  end
end
