defmodule Microscope.Views.Helpers do

  def render_detail({message, values}) do
    Enum.reduce(values, message, fn {k, v}, acc ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end)
  end
  def render_detail(message) do
    message
  end
end
