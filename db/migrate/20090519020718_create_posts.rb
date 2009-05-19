class CreatePosts < ActiveRecord::Migration
  def self.up
    create_table :posts do |t|
      t.string :title
      t.string :uri_name
      t.text   :anonse
      t.text   :text
      
      t.timestamps
    end
    
    add_index :posts, :uri_name, :uniq => true
  end

  def self.down
    drop_table :posts
  end
end
