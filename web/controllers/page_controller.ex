defmodule Microscope.PageController do
  use Microscope.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
