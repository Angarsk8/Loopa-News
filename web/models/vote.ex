defmodule Microscope.Vote do
  use Microscope.Web, :model

  @derive {Poison.Encoder, only: [:author, :post_id]}

  schema "votes" do
    field :author, :string
    belongs_to :post, Microscope.Post

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:author])
    |> validate_required([:author])
  end
end
