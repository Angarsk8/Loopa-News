defmodule Microscope.Repo.Migrations.UpdateNotificationTable do
  use Ecto.Migration

  def change do
    alter table(:notifications) do
      remove :post_id
      add :post_id, references(:posts, on_delete: :nothing)
    end
    create index(:notifications, [:post_id])
  end
end
