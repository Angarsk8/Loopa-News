defmodule Microscope.CommentTest do
  use Microscope.ModelCase

  alias Microscope.Comment

  @valid_attrs %{author: "some content", body: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Comment.changeset(%Comment{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Comment.changeset(%Comment{}, @invalid_attrs)
    refute changeset.valid?
  end
end
