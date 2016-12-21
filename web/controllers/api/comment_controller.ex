defmodule Microscope.CommentController do
  use Microscope.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated,
    [handler: Microscope.SessionController] when action in [:create]

  alias Microscope.{Repo, Post, Comment}

  def create(conn, %{"comment" => comment_params, "post_id" => post_id}) do
    IO.inspect comment_params 
    changeset = Post
      |> Repo.get!(post_id)
      |> Repo.preload([:user, :comments])
      |> build_assoc(:comments)
      |> Comment.changeset(comment_params)

    case Repo.insert(changeset) do
      {:ok, comment} ->
        conn
        |> put_status(:created)
        |> render("show.json", comment: comment)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end
end
