defmodule Microscope.UserChannel do
  use Microscope.Web, :channel

  alias Microscope.{Endpoint, GuardianSerializer}

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

  def notify(id)  do
    Endpoint.broadcast_from!(self, "users:#{id}", "user:notifications", %{ok: true})
  end
end
