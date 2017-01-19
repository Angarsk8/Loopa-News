defmodule Microscope.PostResolver do

  def all(_args, _info) do
    {:ok, Microscope.Repo.all(Microscope.Post)}
  end
end
