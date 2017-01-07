# Loopa News - Yet Another URL Sharing App ⚡

**Loopa News** is an open source social news app  (ala [Hacker News](https://news.ycombinator.com)) built from scratch with [Phoenix](http://www.phoenixframework.org/), [Vue](https://vuejs.org/), [Vue Router](https://github.com/vuejs/vue-router) and [Vuex](https://vuex.vuejs.org/en/intro.html). Inspired by [Microscope](https://github.com/DiscoverMeteor/Microscope), a popular tutorial app developed with [Meteor](https://www.meteor.com/).

## Features

**Loopa News** is basically a realtime URL sharing app that pretends to serve as a mid size example to learn how to build modern reactive [**SPA**](https://en.wikipedia.org/wiki/Single-page_application)s. In this project you will find how to implement important features/services such as:

* User Accounts (Sign Up, Sign In, Sign Out & Change Password)
* Authentication with JSON Web Tokens
* Reactive RESTful APIs [[1]](#reactive-rest-api)
* Realtime notifications & alerts
* Comments with Markdown support
* Edit comments with Markdown preview
* Pagination & many more...

<p name="reactive-rest-api">[1] React to model changes from the controller and broadcast them to all the clients subscribed to a particular Phoenix channel.</p>

## Demo

Demo available [here]().

![Demo GIF](demo.gif)

## Setup

To start this application locally:

* Make sure you have installed _Elixir_, _Erlang_, _Phoenix_, _Node_ and _PostgreSQL_
* Install the Mix dependencies: `$ mix deps.get`
* Create, migrate and seed the development database: `$ mix ecto.setup`
* Start the Phoenix Server: `$ mix phoenix.server` or `$ iex -S mix phoenix.server`
* Install the NPM packages `$ cd client/  && npm install`
* Start the Express development server: `$ npm run dev`

To build the frontend for production:
* In the client directory, run `$ npm run build` (this will execute the `build/build.js` script and will copy the produced files to the `server/priv/js/` and `server/priv/css/` directories)

To deploy this application on Heroku:
* Follow this [guide](http://www.phoenixframework.org/docs/heroku) in the Phoenix website.

## License

[MIT](LICENSE)
