defmodule Microscope.PostController do
  use Microscope.Web, :controller

  @preload [:user, :comments, :votes]

  plug Guardian.Plug.EnsureAuthenticated,
    [handler: Microscope.SessionController] when action in [:create, :update, :delete]

  alias Microscope.{Repo, Post, PostChannel}

  # def index(conn, params) do
  #   posts = Post.preload
  #     |> Repo.aggregate(:avg, :visits)
  #     # |> Repo.paginate(params)
  #
  #   conn
  #   |> put_status(:ok)
  #   |> render("index.json", posts: posts, page: %{})
  # end
  def index(conn, %{"by" => "most_upvoted"} = params) do
    page = Post.preload
      |> Post.most_upvoted
      |> Repo.paginate(params)

    conn
    |> put_status(:ok)
    |> render("index.json", posts: page.entries, page: page)
  end
  def index(conn, params) do
    page = Post.preload
      |> Post.order_asc_by_insertion
      |> Repo.paginate(params)

    conn
    |> put_status(:ok)
    |> render("index.json", posts: page.entries, page: page)
  end


  def show(conn, %{"id" => id}) do
    case Repo.get(Post.preload, id) do
      nil ->
        conn
        |> put_status(:not_found)
        |> render("error.json")
      post ->
        conn
        |> put_status(:ok)
        |> render("show.json", post: post)
    end
  end

  def create(conn, %{"post" => post_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    changeset = current_user
      |> build_assoc(:posts)
      |> Repo.preload(@preload)
      |> Post.changeset(post_params)

    case Repo.insert(changeset) do
      {:ok, post} ->
        PostChannel.broadcast_all(:add_post, post)
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
    user_id = Guardian.Plug.current_resource(conn).id

    changeset = Post.preload
      |> Repo.get_by!(id: id, user_id: user_id)
      |> Post.changeset(post_params)

    case Repo.update(changeset) do
      {:ok, post} ->
        PostChannel.broadcast_all(:update_post, post)
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
    user_id = Guardian.Plug.current_resource(conn).id

    post = Post.preload
      |> Repo.get_by!([
        id: id,
        user_id: user_id
      ])

    Repo.delete!(post)

    PostChannel.broadcast_all(:delete_post, post)

    conn
    |> put_status(:ok)
    |> render("delete.json")
  end
end
