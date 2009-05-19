class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.string :login
      t.string :crypted_password
      t.string :salt
      
      t.timestamps
    end
    
    add_index :users, :login, :uniq => true
  end

  def self.down
    drop_table :users
  end
end
