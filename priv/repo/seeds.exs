# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Microscope.Repo.insert!(%Microscope.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Microscope.{Repo, User, Post}

[
  %{
    username: "agarcia038",
    password: "12345678"
  },
  %{
    username: "angarsk8",
    password: "12345678"
  },
]
|> Enum.map(&User.changeset(%User{}, &1))
|> Enum.each(&Repo.insert!(&1))

user = Repo.get_by!(User, username: "agarcia038")
post = %{url: "http://loopa.io", title: "best site ever!"}

post_changeset = user
  |> Ecto.build_assoc(:posts)
  |> Post.changeset(post)

Repo.insert!(post_changeset)

user = Repo.get_by!(User, username: "angarsk8")
post = %{url: "http://staging.loopa.io", title: "test loopa right now!"}

post_changeset = user
  |> Ecto.build_assoc(:posts)
  |> Post.changeset(post)

Repo.insert!(post_changeset)
