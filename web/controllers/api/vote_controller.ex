defmodule Microscope.VoteController do
  use Microscope.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated,
    [handler: Microscope.SessionController] when action in [:create]

  alias Microscope.{Repo, Post, Vote, PostChannel}

  def create(conn, %{"vote" => vote_params,"post_id" => post_id}) do
    current_user = Guardian.Plug.current_resource(conn)

    case Repo.get_by(Vote, post_id: post_id, author: current_user.username) do
      nil ->
        vote = Post
          |> Repo.get!(post_id)
          |> build_assoc(:votes)
          |> Vote.changeset(%{vote_params | "author" => current_user.username})
          |> Repo.insert!

        PostChannel.broadcast_all(current_user.id, post_id)

        conn
        |> put_status(:created)
        |> render("show.json", vote: vote)

      _vote ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json")
    end
  end
end
