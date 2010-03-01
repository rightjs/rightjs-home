#
# Here are the global site level options
#

RIGHTJS_VERSION       = "1.5.5"

RIGHTJS_ROOT          = "#{RAILS_ROOT}/vendor/right_js"
RIGHTJS_BUILD         = "#{RAILS_ROOT}/public/builds"
RIGHTJS_BUILD_CURRENT = "#{RAILS_ROOT}/public/builds/basic"
RIGHTJS_BUILD_CUSTOM  = "#{RAILS_ROOT}/public/builds/custom"
RIGHTJS_BUILD_GOODS   = "#{RAILS_ROOT}/public/builds/goods"
RIGHTJS_BUILD_UI      = "#{RAILS_ROOT}/public/builds/ui"
RIGHTJS_BUILD_I18N    = "#{RAILS_ROOT}/public/builds/i18n"
RIGHTJS_BUILD_HOTLINK = "#{RAILS_ROOT}/public/hotlink"

RIGHTJS_GOODS         = %w(json effects events behavior dnd rails)
RIGHTJS_UIS           = %w(autocompleter calendar tabs rater slider selectable sortable lightbox tooltips in-edit uploader)

RIGHTJS_BUILD_OPTIONS = %w(no-cookie no-form no-xhr no-fx no-olds ) + RIGHTJS_GOODS


RIGHTJS_TICKETS_TRACKER_URL = 'http://rightjs.lighthouseapp.com/projects/31989'

RIGHTJS_LANGUAGES     = %w(en ru)
RIGHTJS_DEFAULT_LANG  = 'en'

RIGHTJS_SRC_DOCS      = "#{RIGHTJS_ROOT}/docs/docs"

#
# Little Hack
#
class String 
  def t
    I18n.t self
  end
end
