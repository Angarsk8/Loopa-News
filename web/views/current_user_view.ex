defmodule Microscope.CurrentUserView do
  use Microscope.Web, :view

  def render("show.json", %{user: user}) do
    %{
      user: user
    }
  end

  def render("forbidden.json", %{error: error}) do
    %{
      message: error
    }
  end

  def render("error.json", _) do
  end
end
