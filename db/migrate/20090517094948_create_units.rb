class CreateUnits < ActiveRecord::Migration
  def self.up
    create_table :units do |t|
      t.string :name
      t.string :package
      t.text   :description
    end
  end

  def self.down
    drop_table :units
  end
end
