# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20090519060958) do

  create_table "posts", :force => true do |t|
    t.string   "title"
    t.string   "uri_name"
    t.text     "anonse"
    t.text     "text"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "posts", ["uri_name"], :name => "index_posts_on_uri_name"

  create_table "unit_methods", :force => true do |t|
    t.integer "unit_id"
    t.string  "type"
    t.string  "name"
    t.string  "semantic"
    t.text    "description"
    t.text    "example"
  end

  add_index "unit_methods", ["unit_id"], :name => "index_unit_methods_on_unit_id"

  create_table "units", :force => true do |t|
    t.string "name"
    t.string "package"
    t.text   "description"
  end

  create_table "users", :force => true do |t|
    t.string   "login"
    t.string   "crypted_password"
    t.string   "salt"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["login"], :name => "index_users_on_login"

end
