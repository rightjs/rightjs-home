class CreateUnitMethods < ActiveRecord::Migration
  def self.up
    create_table :unit_methods do |t|
      t.integer :unit_id
      t.string  :type  # class/instance
      t.string  :name
      t.string  :semantic
      t.text    :description
      t.text    :example
    end
    
    add_index :unit_methods, :unit_id
  end

  def self.down
    drop_table :unit_methods
  end
end
