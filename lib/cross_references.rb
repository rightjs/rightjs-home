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
    response.body.gsub! /\{([a-z\.#]+[a-z])\}/i do |match|
      desc = $1.dup
      
      unit = Unit.find_by_name(desc) || Unit.find_by_name(desc.slice(0, desc.rindex(/\.|#[a-z]+$/i) || 0)) || @unit
      
      match = if unit
        if unit.name == desc
          "<a href='#{unit_path(unit)}' class='api-ref'>#{unit.name}</a>"
        elsif method = unit.unit_methods.find_by_name(desc.slice(desc.rindex(/\.|#/)+1, desc.size))
          match = unit == @unit ? method.name : "#{unit.name}#{desc.slice(unit.name.size, 1)}#{method.name}"
          "<a href='#{unit_method_path(method)}' class='api-ref'>#{match}</a>"
        else
          desc
        end
      else
        desc
      end
      
      match
    end
  end
end