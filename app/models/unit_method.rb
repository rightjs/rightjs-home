#
# Represents one of the Framework unit methods
#
class UnitMethod < ActiveRecord::Base
  include Internationable
  
  belongs_to :unit
  has_many :descriptions, :dependent => :destroy, :class_name => "UnitMethodDescription"
  
  set_inheritance_column false
  
  default_scope :order => "CASE type WHEN 'class' THEN 0 ELSE 1 END, CASE name WHEN 'initialize' THEN 0 ELSE 1 END, name"
  
  def description
    in_current_language(:description).text
  end
  
  def example
    in_current_language(:description).example
  end
end
