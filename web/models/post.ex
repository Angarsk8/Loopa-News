defmodule Microscope.Post do
  use Microscope.Web, :model

  @derive {Poison.Encoder, only: [:id, :inserted_at, :url, :title, :user_id ,:user, :comments, :votes]}

  schema "posts" do
    field :url, :string
    field :title, :string
    belongs_to :user, Microscope.User
    has_many :comments, Microscope.Comment, on_delete: :delete_all
    has_many :votes, Microscope.Vote, on_delete: :delete_all

    timestamps()
  end

  @url_format ~r/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:url, :title])
    |> validate_required([:url, :title])
    |> validate_format(:url, @url_format, message: "Invalid URL format")
    |> validate_length(:title, min: 5)
    |> unique_constraint(:url, message: "URL already submitted")
  end

  def preload do
    from p in __MODULE__,
      preload: [:user, :votes, :comments]
  end

  def order_and_limit(query, limit) do
    query
    |> order_asc_by_insertion
    |> limit(^limit)
  end

  def order_asc_by_insertion(query) do
    from p in query,
      order_by: [desc: :inserted_at],
      select: p
  end

  def most_upvoted(query) do
    from p in query,
      group_by: p.id,
      join: v in assoc(p, :votes),
      order_by: [desc: count(v.id)]
  end
end
