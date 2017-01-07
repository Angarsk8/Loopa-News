defmodule Microscope.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "users:*", Microscope.UserChannel
  channel "posts:lobby", Microscope.PostChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket, timeout: 45_000

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
