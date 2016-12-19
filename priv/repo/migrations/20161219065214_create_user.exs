defmodule Microscope.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string, null: false
      add :encrypted_password, :string, null: false

      timestamps()
    end
    create unique_index(:users, [:username])
  end
end
