<template>
  <li class="dropdown">
    <a href="#" class="dropdown-toggle my-toggle" data-toggle="dropdown">
      Notifications
      <span
        v-if="notificationCount"
        class="badge badge-inverse"
      >
        {{notificationCount}}
      </span>
      <b class="caret"></b>
    </a>
    <ul class="notification dropdown-menu">
      <li v-if="notificationCount">
        <router-link v-for="notification in notifications" to="/">
          <strong>{{notification.commenterName}}</strong> commented on your post
        </router-link>
      </li>
      <li v-else><span>No Notifications</span></li>
    </ul>
  </li>
</template>
<script>
export default {
  name: "Notification",
  data: () => {
    return {
      notificationCount: 2,
      notifications: [
        {
          commenterName: "agarcia038",
        },
        {
          commenterName: "angarsk8",
        }
      ]
    }
  }
}
</script>
