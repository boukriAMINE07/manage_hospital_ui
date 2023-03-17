<template>
  <div class="row">
    <div class="col-xl-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-8">
              <div class="profile">
                <div class="staff mt-2">
                  <img src="../../../public/assets/images/administrator.jpg" alt="">

                </div>
                <div class="staf-info">
                  <div>
                    <span>Name:</span><h2>{{administrator.name}}</h2>
                    <div>
                      <span >Speciality:</span>
                      <span v-if="administrator.role==='CHIEF_TECHNOLOGY'" class="fs-18">CHIEF TECHNOLOGY</span>
                      <span v-else class="fs-18">CHIEF OPERATING</span>

                    </div>

                  </div>
                  <div class="location mt-5">
                    <div class="mb-3">
                      <div class="row">
                        <div class="col-md-8 ">
                          <span><i class="fa fa-map-marker me-2"></i> {{administrator.address}}</span>
                        </div>

                        <div class="col-md-8 mt-2">
                          <span><i class="fa fa-phone me-2"></i> (+212) {{administrator.phone}}</span>
                        </div>
                        <div class="col-md-12 mt-2">
                          <span><i class="fa fa-envelope me-2"></i>{{ administrator.email }}</span>
                        </div>
                      </div>


                    </div>
                    <div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="d-flex justify-content-between border-bottom mb-3">
                <span class="font-w600 text-black">Followers</span>
                <span>500</span>
              </div>
              <div class="d-flex justify-content-between border-bottom mb-3">
                <span class="font-w600 text-black">Following</span>
                <span>300</span>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <span class="font-w600 text-black">Friends</span>
                <span>300</span>
              </div>
              <div class="mt-4">
                <a href="javascript:void(0);" class="btn btn-primary me-3">Follow</a>
                <a href="javascript:void(0);" class="btn btn-primary">Message</a>
              </div>
            </div>



          </div>
        </div>
      </div>

    </div>




  </div>
  <!--**********************************
      Content body end
  ***********************************-->
</template>

<script>
import AdministratorDataService from "@/services/AdministratorDataService";

export default {
  name: "administrator-details",
  data() {
    return {
      id: this.$route.params.id,
      administrator: {
        id: null,
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        role: "CHIEF_OPERATING",
      }
    }
  },
  methods:{
    getAdministrator(id){
      AdministratorDataService.getAdministrator(id)
          .then(response => {
            this.administrator = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    },

  },
  mounted() {
    this.getAdministrator(this.id);
  }
}
</script>

<style scoped>

</style>