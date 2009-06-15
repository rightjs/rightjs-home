#
# Represents one of the Framework unit methods
#
class UnitMethod < ActiveRecord::Base
  belongs_to :unit
  
  set_inheritance_column false
  
  default_scope :order => "CASE type WHEN 'class' THEN 0 ELSE 1 END, CASE name WHEN 'initialize' THEN 0 ELSE 1 END, name"
  
end
