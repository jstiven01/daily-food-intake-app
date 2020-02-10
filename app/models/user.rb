# frozen_string_literal: true

class User < ApplicationRecord
  # encrypt password
  has_secure_password

  # Model associations
  has_many :nutrients, foreign_key: :user_id
  # Validations
  validates_presence_of :name, :email, :password_digest
  validates_uniqueness_of :email, case_sensitive: false
end
