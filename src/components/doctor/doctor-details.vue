<template>
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-8">
                  <div class="profile">
                    <div class="staff mt-2">
                      <img v-if="doctor.gender==='FEMALE'" src="../../../public/assets/images/nurse.jpg" alt="">
                      <img v-else src="../../../public/assets/images/doctor_Male.jpg" alt="">

                    </div>
                    <div class="staf-info">
                      <div>
                        <span>Name:</span><h2>{{doctor.name}}</h2>
                        <div>
                          <span class="">Speciality:</span><span class="fs-18">{{doctor.speciality}}</span>
                        </div>
                        <span class="">Gender:</span><span class="fs-18">{{doctor.gender}}</span>
                        <div>
                          <span class="">Degrer:</span><span class="fs-18">BSN</span>
                        </div>
                      </div>
                      <div class="location mt-4">
                        <div class="mb-3">
                          <div class="row">
                            <div class="col-md-8 ">
                              <span><i class="fa fa-map-marker me-2"></i> {{doctor.address}}</span>
                            </div>
                            <div class="col-md-8 mt-2">
                              <span><i class="fa fa-building me-2"></i> ICU Department</span>
                            </div>
                            <div class="col-md-8 mt-2">
                              <span><i class="fa fa-phone me-2"></i> (+212) {{doctor.phone}}</span>
                            </div>
                            <div class="col-md-12 mt-2">
                              <span><i class="fa fa-envelope me-2"></i>{{ doctor.email }}</span>
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
import DoctorDataService from "@/services/DoctorDataService";

export default {
  name: "doctor-details",
  data(){
    return{

      id: this.$route.params.id,
      doctor:{
        id:null,
        name: "",
        phone: "",
        email: "",
        password: "",
        gender: "",
        speciality: "",
        address: "",
      }
    }
  },
  methods:{
    getDoctor(){
      DoctorDataService.getDoctor(this.id)
          .then(response => {
            this.doctor = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

  },
  mounted(){
    this.getDoctor();
  }
}
</script>

<style scoped>

</style>