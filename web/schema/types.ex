defmodule Microscope.Schema.Types do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Microscope.Repo

  @desc "A blog user"
  object :user do
    field :id, :id
    field :username, :string
    field :posts, list_of(:post), resolve: assoc(:posts)
    field :notifications, list_of(:notification), resolve: assoc(:notifications)
  end
  # field :username , :string
  # field :password , :string, virtual: true
  # field :encrypted_password, :string
  # has_many :posts, Microscope.Post
  # has_many :notifications, Microscope.Notification

  @desc "A post entry"
  object :post do
    field :id, :id
    field :url, :string
    field :title, :string
    field :user, :user, resolve: assoc(:user)
  end
  # field :url, :string
  # field :title, :string
  # belongs_to :user, Microscope.User
  # has_many :comments, Microscope.Comment, on_delete: :delete_all
  # has_many :votes, Microscope.Vote, on_delete: :delete_all

  @desc "A post notification"
  object :notification do
    field :id, :id
    field :username, :string
    field :user, :user, resolve: assoc(:user)
    field :post, :post, resolve: assoc(:post)
  end
  # field :username, :string
  # field :post_id, :integer
  # belongs_to :user, Microscope.User
end
