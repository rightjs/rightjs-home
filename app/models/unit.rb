#
# Represents one of the Framework Unit
#
class Unit < ActiveRecord::Base
  has_many :unit_methods, :dependent => :destroy
  
  default_scope :order => :name
  
  def uri_name
    name.downcase.gsub '.', '/'
  end
  
  def self.find_by_uri_name(name)
    find_by_name name.split('/').map(&:capitalize).join('.')
  end
end
