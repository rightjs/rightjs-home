#
# Just a dummy user to access the admin area
#
require 'digest/sha1'
class User < ActiveRecord::Base
  validates_presence_of :login
  
  def self.authenticate(login, password)
    if user = find_by_login(login)
      if user.crypted_password == user.encrypt(password)
        return user
      end
    end
  end
  
  def password=(password)
    self.salt             = encrypt("#{encrypt(rand)}--#{rand}")
    self.crypted_password = encrypt(password)
  end
  
  def encrypt(string)
    SECURITY_NUMBER.times do
      string = Digest::SHA1.hexdigest("#{SECURE_KEY}--#{string}--#{salt}")
    end
    string
  end
end
