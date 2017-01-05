defmodule Microscope.NotificationView do
  use Microscope.Web, :view

  import Microscope.Views.Helpers, only: [render_detail: 1]

  def render("index.json", %{notifications: notifications}) do
    %{
      notifications: notifications
    }
  end

  def render("show.json", %{notification: notification}) do
    %{
      notification: notification
    }
  end
  def render("show.json", _params) do
    %{
      ok: true
    }
  end

  def render("error.json", %{changeset: changeset}) do
    errors =
      Enum.reduce(changeset.errors, %{}, fn {field, detail}, acc ->
        Map.put(acc, field, render_detail(detail))
      end)

    %{
      errors: errors
    }
  end

  def render("delete.json", _) do
    %{
      ok: true
    }
  end

  def render("forbidden.json", %{error: error}) do
    %{
      message: error
    }
  end
end
