defmodule Microscope.VoteView do
  use Microscope.Web, :view

  import Microscope.Views.Helpers, only: [render_detail: 1]

  def render("show.json", %{vote: vote}) do
    %{
      vote: vote
    }
  end

  def render("error.json", _params) do
    %{
      message: "Post already upvoted by the same author"
    }
  end

  def render("forbidden.json", %{error: error}) do
    %{
      message: error
    }
  end
end
