<template>
  <div id="app" class="container">
    <app-header></app-header>
    <div class="errors">
      <app-alert v-for="alert in appAlerts" :alert="alert"></app-alert>
    </div>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Alert from './components/Alert'
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  components: {
    'app-header': Header,
    'app-alert': Alert
  },

  computed: mapGetters([
    'appAlerts'
  ])
}
</script>

<style>
.grid-block,
.main,
.post,
.comments > li {
  background: #fff;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}

.comment-form {
  background: transparent;
  padding: 10px;
}

body {
  background: #eee;
  color: #666666;
}

hr {
  margin-top: 10px;
  margin-bottom: 10px;
}

a {
  text-decoration: none !important;
}

#main {
  position: relative;
}

.page {
  position: absolute;
  top: 0px;
  width: 100%;
}

.navbar {
  margin-bottom: 10px;
}

.navbar .navbar-inner {
  border-radius: 0px 0px 3px 3px;
}

.post {
  *zoom: 1;
  position: relative;
  opacity: 1;
  min-height: 90px;
}

.post:before,
.post:after {
  content: "";
  display: table;
}

.post:after {
  clear: both;
}

.post.invisible {
  opacity: 0;
}

.post.instant {
  -webkit-transition: none;
  transition: none;
}

.post.animate {
  -webkit-transition: all 300ms 0ms;
  transition: all 300ms 0ms ease-in;
}

.post .upvote {
  display: block;
  margin: 15px 15px 0 0;
  float: left;
}

/*.post .post-content {
  float: left;
}*/

.post .post-content h3 {
  margin: 0;
  line-height: 1.4;
  font-size: 18px;
}

.post .post-content h3 a {
  display: inline-block;
  margin-right: 5px;
}

.post .post-content h3 .domain {
  font-weight: normal;
  font-size: 14px;
  display: inline-block;
  color: #aaaaaa;
}

.post .post-content h3 .edit {
  font-weight: normal;
  font-size: 12px;
  display: inline-block;
}

.post .post-content p {
  margin: 5px 0 0 0;
}

.post .author {
  font-weight: 500;
}

.post .discuss {
  display: block;
  float: right;
  margin-top: 7px;
}

.comments {
  list-style-type: none;
  margin: 0;
}

.comments li img {
  display: block;
  max-width: 100%;
  height: auto;
}

.comments li h4 {
  font-size: 16px;
  margin: 0;
}

.comments li h4 .date {
  font-size: 12px;
  font-weight: normal;
}

.comments li h4 a {
  font-size: 12px;
}

.comments li pre p:last-child {
  margin-bottom: 0;
}

.comment-body {
  margin: 0 0 0 5px;
  font-size: 15px;
}

.comment-icon.delete:hover{
  color: #a94442;
  transform: scale(1.2);
}

.comment-icon.edit:hover{
  color: #8a6d3b;
  transform: scale(1.2);
}

.comment-icon:before {
  margin: 0 8px;
  font-size: 14px;
  cursor: pointer;
}

.dropdown-menu span {
  display: block;
  padding: 3px 20px;
  clear: both;
  line-height: 20px;
  color: #bbb;
  white-space: nowrap;
}

.load-more {
  display: block;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.05);
  text-align: center;
  height: 60px;
  line-height: 60px;
  margin-bottom: 10px;
}

.load-more:hover {
  text-decoration: none;
  background: rgba(0, 0, 0, 0.1);
}

.posts .spinner-container {
  position: relative;
  height: 100px;
}

.jumbotron {
  text-align: center;
}

.jumbotron h2 {
  font-size: 60px;
  font-weight: 100;
}

.errors {
  position: fixed;
  z-index: 10000;
  padding: 10px;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  pointer-events: none;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .8s ease;
}

.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(20px);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all .8s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
