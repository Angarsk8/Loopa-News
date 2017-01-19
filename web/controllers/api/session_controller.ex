defmodule Microscope.SessionController do
  use Microscope.Web, :controller

  alias Microscope.User

  plug :scrub_params, "session" when action in [:create]

  def create(conn, %{"session" => session_params}) do
    case Microscope.Session.authenticate(session_params) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)

        conn
        |> put_status(:created)
        |> render("show.json", jwt: jwt, user: user)

      :error ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", message: "Invalid username or password")
    end
  end

  def update(conn, %{"session" => session_params}) do
    username = Guardian.Plug.current_resource(conn).username
    user_session = %{
      "username" => username,
      "password" => session_params["current_password"]
    }

    case Microscope.Session.authenticate(user_session) do
      {:ok, user} ->

        user_params = %{
          "password" => session_params["password"],
          "password_confirmation" => session_params["password_confirmation"]
        }

        changeset = User.changeset(user, user_params)

        case Repo.update(changeset) do
          {:ok, user} ->

            conn
            |> put_status(:ok)
            |> render("show.json", user: user)

          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render("error.json", changeset: changeset)
        end

      :error ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", current_password: "Incorrect password")
    end
  end

  def delete(conn, _) do
    {:ok, claims} = Guardian.Plug.claims(conn)

    conn
    |> Guardian.Plug.current_token
    |> Guardian.revoke!(claims)

    conn
    |> render("delete.json")
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(:forbidden)
    |> render("forbidden.json", error: "Not Authenticated")
  end
end
