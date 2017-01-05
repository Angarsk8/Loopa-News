defmodule Microscope.Repo do
  use Ecto.Repo, otp_app: :microscope
  use Scrivener, page_size: 5
end
