defmodule Microscope.Comment do
  use Microscope.Web, :model

  @derive {Poison.Encoder, only: [:id, :inserted_at, :updated_at, :author, :body, :post_id]}

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
    |> strip_unsafe_body(params)
  end

  defp strip_unsafe_body(model, %{"body" => nil}) do
    model
  end
  defp strip_unsafe_body(model, %{"body" => body}) do
    {:safe, clean_body} = Phoenix.HTML.html_escape(body)
    model |> put_change(:body, clean_body)
  end
  defp strip_unsafe_body(model, _) do
    model
  end
end
