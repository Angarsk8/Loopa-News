defmodule Microscope.UserChannel do
  use Microscope.Web, :channel

  def join("users:" <> user_id, _params, socket) do
    {:ok, socket}
  end
end
