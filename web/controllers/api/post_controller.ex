defmodule Microscope.PostController do
  use Microscope.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated,
    [handler: Microscope.SessionController] when action in [:create, :update, :delete]

  alias Microscope.{Repo, Post}

  def index(conn, _params) do
    posts = Post
      |> Repo.all
      |> Repo.preload(:user)

    conn
    |> put_status(:ok)
    |> render("index.json", posts: posts)
  end

  def show(conn, %{"id" => id}) do
    case Repo.get(Post, id) do
      nil ->
        conn
        |> put_status(:not_found)
        |> render("error.json")
      post ->
        conn
        |> put_status(:ok)
        |> render("show.json", post: post |> Repo.preload(:user))
    end
  end

  def create(conn, %{"post" => post_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    changeset = current_user
      |> build_assoc(:posts)
      |> Repo.preload(:user)
      |> Post.changeset(post_params)

    case Repo.insert(changeset) do
      {:ok, post} ->
        conn
        |> put_status(:created)
        |> render("show.json", post: post)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "post" => post_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    changeset = current_user
      |> assoc(:posts)
      |> Repo.get!(id)
      |> Repo.preload(:user)
      |> Post.changeset(post_params)

    case Repo.update(changeset) do
      {:ok, post} ->
        conn
        |> put_status(:ok)
        |> render("show.json", post: post)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    Guardian.Plug.current_resource(conn)
    |> assoc(:posts)
    |> Repo.get!(id)
    |> Repo.delete!

    conn
    |> render("delete.json")
  end

  # def create(conn, %{"board" => board_params}) do
  #   current_user = Guardian.Plug.current_resource(conn)
  #
  #   changeset = current_user
  #     |> build_assoc(:owned_boards)
  #     |> Board.changeset(board_params)
  #
  #   case Repo.insert(changeset) do
  #     {:ok, board} ->
  #       conn
  #       |> put_status(:created)
  #       |> render("show.json", board: board )
  #     {:error, changeset} ->
  #       conn
  #       |> put_status(:unprocessable_entity)
  #       |> render("error.json", changeset: changeset)
  #   end
  # end
end
