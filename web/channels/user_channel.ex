defmodule Microscope.UserChannel do
  use Microscope.Web, :channel

  alias Microscope.{Endpoint, GuardianSerializer, Notification}

  def join("users:" <> user_id, %{"token" => token}, socket) do
    case Guardian.decode_and_verify(token) do
      {:ok, claims} ->
        case GuardianSerializer.from_token(claims["sub"]) do
          {:ok, user} ->
            {:ok, assign(socket, :current_user, user)}
          {:error, _reason} ->
            :error
        end
      {:error, _reason} ->
        :error
    end
  end

  def leave(_reason, socket) do
    {:ok, socket}
  end

  def notify(event, notification = %Notification{user_id: id}) do
    Endpoint.broadcast_from!(self, "users:#{id}", "user:#{event}", notification)
  end

  def leave(id) do
    Endpoint.broadcast_from!(self, "users:#{id}", "user:left", %{})
  end
end
