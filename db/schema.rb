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

ActiveRecord::Schema.define(:version => 20100102095949) do

  create_table "downloads", :force => true do |t|
    t.string   "filename"
    t.string   "version"
    t.string   "ip_address"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "downloads", ["filename"], :name => "index_downloads_on_filename"
  add_index "downloads", ["ip_address"], :name => "index_downloads_on_ip_address"
  add_index "downloads", ["version"], :name => "index_downloads_on_version"

  create_table "posts", :force => true do |t|
    t.string   "title"
    t.string   "uri_name"
    t.text     "anonse"
    t.text     "text"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "posts", ["uri_name"], :name => "index_posts_on_uri_name"

  create_table "unit_descriptions", :force => true do |t|
    t.integer "unit_id"
    t.string  "language"
    t.text    "text"
  end

  add_index "unit_descriptions", ["language"], :name => "index_unit_descriptions_on_language"
  add_index "unit_descriptions", ["unit_id"], :name => "index_unit_descriptions_on_unit_id"

  create_table "unit_method_descriptions", :force => true do |t|
    t.integer "unit_method_id"
    t.string  "language"
    t.text    "text"
    t.text    "example"
  end

  add_index "unit_method_descriptions", ["language"], :name => "index_unit_method_descriptions_on_language"
  add_index "unit_method_descriptions", ["unit_method_id"], :name => "index_unit_method_descriptions_on_unit_method_id"

  create_table "unit_methods", :force => true do |t|
    t.integer "unit_id"
    t.string  "type"
    t.string  "name"
    t.text    "semantic"
  end

  add_index "unit_methods", ["unit_id"], :name => "index_unit_methods_on_unit_id"

  create_table "units", :force => true do |t|
    t.string "name"
    t.string "package"
  end

  add_index "units", ["name"], :name => "index_units_on_name"
  add_index "units", ["package"], :name => "index_units_on_package"

  create_table "users", :force => true do |t|
    t.string   "login"
    t.string   "crypted_password"
    t.string   "salt"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["login"], :name => "index_users_on_login"

end
