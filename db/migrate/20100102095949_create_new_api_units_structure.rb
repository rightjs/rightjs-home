class CreateNewApiUnitsStructure < ActiveRecord::Migration
  def self.up
    drop_table :units
    drop_table :unit_methods
    
    create_table :units do |t|
      t.string :name
      t.string :package
    end
    
    add_index :units, :name
    add_index :units, :package
    
    create_table :unit_descriptions do |t|
      t.integer :unit_id
      t.string  :language
      t.text    :text
    end
    
    add_index :unit_descriptions, :unit_id
    add_index :unit_descriptions, :language
    
    create_table :unit_methods do |t|
      t.integer :unit_id
      t.string  :type
      t.string  :name
      t.text    :semantic
    end
    
    add_index :unit_methods, :unit_id
    
    create_table :unit_method_descriptions do |t|
      t.integer :unit_method_id
      t.string  :language
      t.text    :text
      t.text    :example
    end
    
    add_index :unit_method_descriptions, :unit_method_id
    add_index :unit_method_descriptions, :language
  end



  def self.down
    drop_table :units
    drop_table :unit_methods
    drop_table :unit_descriptions
    drop_table :unit_method_descriptions
    
    create_table :unit_methods do |t|
      t.integer :unit_id
      t.string  :type
      t.string  :name
      t.text    :semantic
      t.text    :description
      t.text    :example
    end

    add_index :unit_methods, :unit_id

    create_table :units do |t|
      t.string :name
      t.string :package
      t.text   :description
    end
  end
end
