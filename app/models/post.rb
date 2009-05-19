#
# represents a blog post
#
class Post < ActiveRecord::Base
  acts_as_uri_named :uri_name_field => :title, :validate => false
  
  validates_presence_of :title, :anonse
  
  named_scope :recent, :order => "posts.created_at DESC"
end
