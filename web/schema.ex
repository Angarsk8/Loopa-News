defmodule Microscope.Schema do
  use Absinthe.Schema
  import_types Microscope.Schema.Types

  query do
    @desc "Get all posts"
    field :posts, list_of(:post) do
      resolve &Microscope.PostResolver.all/2
    end

    @desc "Get all users"
    field :users, list_of(:user) do
      resolve &Microscope.UserResolver.all/2
    end

    @desc "Get all notifications"
    field :notifications, list_of(:notification) do
      resolve &Microscope.NotificationResolver.all/2
    end

    @desc "Get user by id"
    field :user, :user do
      arg :id, non_null(:id)
      # arg :username, non_null(:username)
      resolve &Microscope.UserResolver.find/2
    end
  end
end
