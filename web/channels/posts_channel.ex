defmodule Microscope.PostChannel do
  use Microscope.Web, :channel

  alias Microscope.Endpoint

  def join("posts:lobby", _payload, socket) do
    {:ok, socket}
  end

  def broadcast_all(id)  do
    Endpoint.broadcast_from!(self, "posts:lobby", "posts:refresh", %{id: id})
  end
end
