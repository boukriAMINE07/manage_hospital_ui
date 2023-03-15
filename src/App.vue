<template>

<header-vue></header-vue>
  <!--**********************************
          Content body start
      ***********************************-->
  <div class="content-body">
    <!-- row -->
    <div class="container-fluid">
    <router-view></router-view>
    </div>
  </div>
  <!--**********************************
      Content body end
  ***********************************-->

  <!-- Required vendors -->
</template>






<script>


import HeaderVue from './components/Header.vue'


export default {
  name: 'App',
  components: {
    HeaderVue,

  }
}
</script>

<link href="assets/vendor/fullcalendar/css/main.min.css" rel="stylesheet">
<link href="assets/vendor/bootstrap-select/dist/css/bootstrap-select.min.css" rel="stylesheet">
<link href="assets/css/style.css" rel="stylesheet">
