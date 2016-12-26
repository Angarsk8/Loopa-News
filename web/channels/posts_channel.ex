defmodule Microscope.PostChannel do
  use Microscope.Web, :channel

  alias Microscope.Endpoint

  def join("posts:lobby", _payload, socket) do
    {:ok, socket}
  end

  def broadcast_all(user_id, post_id, type \\ :normal)  do
    payload = %{
      user_id: user_id,
      post_id: post_id,
      type: type
    }

    Endpoint.broadcast_from!(self, "posts:lobby", "posts:refresh", payload)
  end
end
