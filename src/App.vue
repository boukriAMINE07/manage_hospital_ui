<template>

<header-vue></header-vue>
  <!--**********************************
          Content body start
      ***********************************-->
  <div class="content-body">
    <!-- row -->
    <div class="container-fluid">
      <home-vue></home-vue>
    <router-view ></router-view>

    </div>
  </div>
  <footer-vue></footer-vue>
  <!--**********************************
      Content body end
  ***********************************-->


  <!-- Required vendors -->
</template>






<script>


import HeaderVue from './components/Header.vue'
import FooterVue from './components/Footer.vue'
import HomeVue from "@/components/Home";


export default {
  name: 'App',
  components: {
    HomeVue,
    HeaderVue,
    FooterVue
  },
  data() {
    return {

    }
  }
}
</script>

<link href="assets/vendor/fullcalendar/css/main.min.css" rel="stylesheet">
<link href="assets/vendor/bootstrap-select/dist/css/bootstrap-select.min.css" rel="stylesheet">
<link href="assets/css/style.css" rel="stylesheet">
