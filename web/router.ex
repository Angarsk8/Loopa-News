defmodule Microscope.Router do
  use Microscope.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Microscope do
    pipe_through :api

    post "/registrations", RegistrationController, :create

    post "/sessions", SessionController, :create
    put "/sessions", SessionController, :update
    delete "/sessions", SessionController, :delete

    get "/current_user", CurrentUserController, :show

    resources "/posts", PostController, except: [:edit, :new] do
      resources "/comments", CommentController, except: [:show, :new, :edit]
      resources "/votes", VoteController, only: [:create, :delete]
    end

    resources "/notifications", NotificationController, only: [:index, :create, :delete]
  end

  forward "/api", Absinthe.Plug, schema: Microscope.Schema

  if Mix.env !== :prod do
    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: Microscope.Schema
  end

  scope "/", Microscope do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end
