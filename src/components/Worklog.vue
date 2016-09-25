<template>
  <section class="worklog-page">
    <router-view
      :loading="loading"
      :issues-num="$route.params.num"
      :route-name="$route.name"></router-view>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        nextPage: 1
      }
    },
    props: ['loading']
  }
</script>
