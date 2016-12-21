# defmodule Microscope.PostChannel do
#   use Microscope.Web, :channel
#
#   def join("posts:lobby", _params, socket) do
#     {:ok, socket}
#   end
#
#   def handle_in("list", %{"body" => body}, socket) do
#     broadcast! socket, "new_msg", %{body: body}
#     {:noreply, socket}
#   end
#
#   def handle_out("new_msg", payload, socket) do
#     push socket, "new_msg", payload
#     {:noreply, socket}
#   end
# end
