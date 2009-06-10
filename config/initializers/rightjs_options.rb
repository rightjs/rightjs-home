#
# Here are the global site level options
#

RIGHTJS_ROOT          = "#{RAILS_ROOT}/lib/right_js"
RIGHTJS_BUILD         = "#{RAILS_ROOT}/public/builds/current"
RIGHTJS_BUILD_CUSTOM  = RIGHTJS_BUILD + "/custom"

RIGHTJS_BUILD_OPTIONS = %w(cookie form xhr fx build)


RIGHTJS_TICKETS_TRACKER_URL = 'http://rightjs.lighthouseapp.com/projects/31989'