#
# Patching Maruku for our own needs
#
class Shmaruku < Maruku
  def self.to_html(string) 
    self.new(string.gsub(/\{([a-z\.#]+)\}/im, '-|\1|-')).to_html
  end
  
  def to_html
    html = super
    
    PATCHES.each{ |patch| html.gsub! *patch }
    
    html
  end
  
  PATCHES = [
    ['&#39;',                          "'"      ],
    ['&quot;',                         '"'      ],
    [/<h(\d)\sid='(.+?)'>/,            '<h\1>'  ],
    ['code>',                          'tt>'    ],
    ['<pre><tt>',                      '<code>' ],
    ['</tt></pre>',                    '</code>'],
    ["<td style='text-align: left;'>", '<td>'   ],
    [/\-\|([a-z\.#]+)\|\-/im,          '{\1}'   ]
  ]
end