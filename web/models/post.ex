defmodule Microscope.Post do
  use Microscope.Web, :model

  @derive {Poison.Encoder, only: [:id, :url, :title, :user_id, :user, :comments]}

  schema "posts" do
    field :url, :string
    field :title, :string
    belongs_to :user, Microscope.User
    has_many :comments, Microscope.Comment, on_delete: :delete_all

    timestamps()
  end

  @fields [:url, :title]
  @url_format ~r/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @fields)
    |> validate_required(@fields)
    |> validate_format(:url, @url_format, message: "Invalid URL format")
    |> validate_length(:title, min: 5)
    |> unique_constraint(:url, message: "URL already submitted")
  end
end
