#
# Patching Maruku for our own needs
#
class Shmaruku < Maruku
  KEY = "OH THIS TIME IM REALLY GONNA GET YA"
  
  def self.to_html(string) 
    self.new(string.gsub(/\{([a-z\.#]+)\}/im, "#{KEY}\\1#{KEY}")).to_html
  end
  
  def to_html
    html = super
    
    PATCHES.each{ |patch| html.gsub! *patch }
    
    html
  end
  
  PATCHES = [
    ['&#39;',                          "'"            ],
    ['&quot;',                         '"'            ],
    [/<h(\d)\sid='(.+?)'>/,            '<h\1>'        ],
    ['code>',                          'tt>'          ],
    ['<pre><tt>',                      '<code>'       ],
    ['</tt></pre>',                    '</code>'      ],
    ["<td style='text-align: left;'>", '<td>'         ],
    ["&amp;lt;",                       '&lt;'         ],
    ["&amp;gt;",                       '&gt;'         ],
    [/<div([^>]+)\/>/,                 '<div\1></div>'],
    [/#{KEY}([a-z\.#]+)#{KEY}/im,      '{\1}'         ]
  ]
end