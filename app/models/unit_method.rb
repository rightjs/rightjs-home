#
# Represents one of the Framework unit methods
#
class UnitMethod < ActiveRecord::Base
  belongs_to :unit
  
  default_scope :order => "type = 'class', name"
  
end
