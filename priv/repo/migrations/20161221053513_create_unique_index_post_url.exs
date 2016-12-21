defmodule Microscope.Repo.Migrations.CreateUniqueIndexPostUrl do
  use Ecto.Migration

  def change do
    create unique_index(:posts, [:url])
  end
end
