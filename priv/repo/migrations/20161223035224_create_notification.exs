defmodule Microscope.Repo.Migrations.CreateNotification do
  use Ecto.Migration

  def change do
    create table(:notifications) do
      add :username, :string
      add :post_id, :integer
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:notifications, [:user_id])

  end
end
