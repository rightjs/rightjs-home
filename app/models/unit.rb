#
# Represents one of the Framework Unit
#
class Unit < ActiveRecord::Base
  include Internationable
  
  has_many :unit_methods, :dependent => :destroy
  has_many :descriptions, :dependent => :destroy, :class_name => "UnitDescription"
  
  default_scope :order => :name
  
  def uri_name
    name.downcase.gsub '.', '/'
  end
  
  def self.find_by_uri_name(name)
    find_by_name name.split('/').map(&:capitalize).join('.')
  end
  
  def description
    in_current_language(:description).text
  end
end
