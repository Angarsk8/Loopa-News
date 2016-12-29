defmodule Microscope.Notification do
  use Microscope.Web, :model

  @derive {Poison.Encoder, only: [:id, :username, :post_id, :user_id]}

  schema "notifications" do
    field :username, :string
    field :post_id, :integer
    belongs_to :user, Microscope.User

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :post_id])
    |> validate_required([:username, :post_id])
  end

  def all_notifications_in_post(query, user_id, post_id) do
    from n in query,
      where: n.user_id == ^user_id and
             n.post_id == ^post_id
  end
end
