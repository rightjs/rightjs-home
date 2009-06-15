#
# This modules handles the api-documentation cross reference links generation
#
module CrossReferences
  def self.included(base)
    base.instance_eval do
      after_filter :hook_api_references
    end
  end
  
  def hook_api_references
    response.body.gsub! /\{([a-z]*)((\.|\#)?)([a-z_]*)\}/i do |match|
      unit   = $1.blank? ? @unit : Unit.find_by_name($1) || $1.dup
      method = $4.blank? ? nil : unit.is_a?(Unit) ? unit.unit_methods.find_by_name($4) || $4.dup : $4.dup
      type   = $2.dup
      
      unless match =~ /^\{\s*\}$/
        match = unit == @unit ? "#{method.is_a?(UnitMethod) ? method.name : method}" :
          "#{unit.is_a?(Unit) ? unit.name : unit}#{type}#{method.is_a?(UnitMethod) ? method.name : method}"
        
        match = if unit.is_a?(Unit) && method.is_a?(UnitMethod)
          "<a href='#{unit_method_path(method)}' class='api-ref'>#{match}</a>"
        elsif unit.is_a?(Unit) && method.blank?
          "<a href='#{unit_path(unit)}' class='api-ref'>#{match}</a>"
        end
      end
      match
    end
  end
end