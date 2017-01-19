<template>
  <div id="app" class="container">
    <transition-group name="slide-fade" tag="div" class="alerts">
      <app-alert
        v-for="alert in appAlerts"
        v-bind:key="alert.id"
        :alert="alert"
      ></app-alert>
    </transition-group>
    <app-header></app-header>
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
  padding: 10px;
  margin-bottom: 10px;
}

.comment-form {
  background: transparent;
  padding: 10px;
}

hr {
  margin-top: 10px;
  margin-bottom: 10px;
  border-top: 2px dashed rgba(0,0,0,.15);
}

a {
  text-decoration: none !important;
}

button {
  outline: 0 !important;
}

#app {
  margin-top: 15px;
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
  margin: 15px 20px 0 0;
  float: left;
}

.post .post-content h3 {
  margin: 0;
  line-height: 1.4;
  font-size: 20px;
}

.post .post-content h3 a {
  display: inline-block;
  margin-right: 5px;
}

.post .post-content h3 .domain {
  font-weight: normal;
  font-size: 15px;
  display: inline-block;
  color: #aaaaaa;
}

.post .post-content h3 .edit {
  font-weight: normal;
  font-size: 15px;
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
  font-size: 18px;
  margin-bottom: 15px;
  margin-left: 5px;
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

.comment-body.edited-comment-body {
  margin-top: 12px;
}

.comment-body pre {
  margin: 10px 0 10px 0;
  padding: 16px;
  overflow: auto;
  background-color: #f7f7f7;
  border-radius: 3px;
}

.comment-body > ul {
  list-style-type: disc;
}

.comment-icon.delete:hover{
  color: #c9302c;
  transform: scale(1.2);
}

.comment-icon.edit:hover{
  color: #f0ad4e;
  transform: scale(1.2);
}

.comment-icon:before {
  margin: 0 6px;
  font-size: 17px;
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
  margin-top: 15px;
}

.load-more:hover {
  text-decoration: none;
  background: rgba(0, 0, 0, 0.1);
}

.jumbotron {
  text-align: center;
}

.jumbotron h2 {
  font-size: 60px;
  font-weight: 100;
}

.alerts {
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

.slide-fade-right-enter-active, .slide-fade-right-leave-active {
  transition: all .8s ease;
}

.slide-fade-right-enter, .slide-fade-right-leave-active {
  transform: translateX(-20px);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all .8s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
