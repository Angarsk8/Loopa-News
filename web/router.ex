defmodule Microscope.Router do
  use Microscope.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", Microscope do
    pipe_through :api
  end
end
