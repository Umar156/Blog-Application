class User < ApplicationRecord

  has_many :articles, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  has_one_attached :avatar
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  validates :name, presence:true,format:{ with: /\A[a-zA-Z]+\z/, message: "only allows letters" }
  validates :username,presence:true


  ROLES = %w[user admin].freeze
  validates :role, inclusion: { in: ROLES, message: "must be 'user' or 'admin'" }

  before_save :set_default_role

  private

  def set_default_role
    self.role ||= 'user' 
  end
end
                     