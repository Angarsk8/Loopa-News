defmodule Microscope.UserResolver do

  def all(_args, _info) do
    {:ok, Microscope.Repo.all(Microscope.User)}
  end

  def find(%{id: id}, _info) do
    case Microscope.Repo.get(Microscope.User, id) do
      nil -> {:error, "User #{id} not found"}
      user -> {:ok, user}
    end
  end
  def find(%{username: username}, _info) do
    case Microscope.Repo.get_by(Microscope.User, username: username) do
      nil -> {:error, "User #{username} not found"}
      user -> {:ok, user}
    end
  end
end
