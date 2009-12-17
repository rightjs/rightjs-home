class CreateDownloads < ActiveRecord::Migration
  def self.up
    create_table :downloads do |t|
      t.string :filename
      t.string :version
      t.string :ip_address
      t.timestamps
    end
    
    add_index :downloads, :filename
    add_index :downloads, :version
    add_index :downloads, :ip_address
  end

  def self.down
    drop_table :downloads
  end
end
