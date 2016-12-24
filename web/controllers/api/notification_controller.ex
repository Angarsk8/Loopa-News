defmodule Microscope.NotificationController do
  use Microscope.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated,
    [handler: Microscope.SessionController] when action in [:index, :create, :delete]

  alias Microscope.{Repo, Post, Notification, UserChannel}

  def index(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)

    notifications = current_user
      |> assoc(:notifications)
      |> Repo.all

    conn
    |> put_status(:ok)
    |> render("index.json", notifications: notifications)
  end

  def create(conn, %{"notification" => notifications_params}) do
    %{"post_id" => post_id, "username" => username} = notifications_params

    user = Post
      |> Repo.get!(post_id)
      |> assoc(:user)
      |> Repo.one!

    if user.username === username do
      conn
      |> put_status(:ok)
      |> render("show.json")
    else
      changeset = user
        |> build_assoc(:notifications)
        |> Notification.changeset(notifications_params)

      case Repo.insert(changeset) do
        {:ok, notification} ->
          UserChannel.notify(notification.user_id)
          conn
          |> put_status(:ok)
          |> render("show.json", notification: notification)
        {:error, changeset} ->
          conn
          |> put_status(:unprocessable_entity)
          |> render("error.json", changeset: changeset)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    notification = Guardian.Plug.current_resource(conn)
      |> assoc(:notifications)
      |> Repo.get!(id)
      |> Repo.delete!

    UserChannel.notify(notification.user_id)

    conn
    |> put_status(:ok)
    |> render("delete.json")
  end
end
