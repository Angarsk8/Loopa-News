defmodule Microscope.Notification do
  use Microscope.Web, :model

  @derive {Poison.Encoder, only: [:id, :username, :post_id, :user_id]}

  schema "notifications" do
    field :username, :string
    field :post_id, :integer
    belongs_to :user, Microscope.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :post_id])
    |> validate_required([:username, :post_id])
  end
end
