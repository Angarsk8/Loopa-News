defmodule Microscope.RegistrationView do
  use Microscope.Web, :view

  import Microscope.Views.Helpers, only: [render_detail: 1]

  def render("error.json", %{changeset: changeset}) do
    errors =
      Enum.reduce(changeset.errors, %{}, fn {field, detail}, acc ->
        Map.put(acc, field, render_detail(detail))
      end)

    %{
      errors: errors
    }
  end
end
