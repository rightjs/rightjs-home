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

ActiveRecord::Schema.define(:version => 20090517094956) do

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

end
