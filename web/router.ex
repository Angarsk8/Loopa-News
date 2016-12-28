defmodule Microscope.Router do
  use Microscope.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Microscope do
    pipe_through :api

    post "/registrations", RegistrationController, :create

    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete

    get "/current_user", CurrentUserController, :show


    resources "/posts", PostController, except: [:edit, :new] do
      resources "/comments", CommentController, except: [:show, :new, :edit]
      resources "/votes", VoteController, only: [:create, :delete]
    end

    resources "/notifications", NotificationController, only: [:index, :create, :delete]

  end
end
