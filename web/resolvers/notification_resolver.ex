defmodule Microscope.NotificationResolver do

  def all(_args, _info) do
    {:ok, Microscope.Repo.all(Microscope.Notification)}
  end
end
