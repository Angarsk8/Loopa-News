defmodule Microscope.Comment do
  use Microscope.Web, :model

  @derive {Poison.Encoder, only: [:inserted_at, :author, :body, :post_id]}

  schema "comments" do
    field :author, :string
    field :body, :string
    belongs_to :post, Microscope.Post

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:author, :body])
    |> validate_required([:author, :body])
  end
end
