<template>
  <div class="form-head d-flex mb-3 mb-md-4 align-items-start">
    <div class="me-auto d-none d-lg-block">

      <router-link to="/doctors/add-doctor"  class="btn btn-primary btn-rounded"> + Add New</router-link>

    </div>

    <div class="input-group search-area ms-auto d-inline-flex me-3">
      <input type="text" v-model="searchDoctor" class="form-control" @keyup="retrievePatientsBySearch" placeholder="Search here">
      <div class="input-group-append">
        <button type="button"   class="input-group-text">
          <i class="flaticon-381-search-2"></i></button>
      </div>
    </div>
    <a href="javascript:void(0);" class="settings-icon"><i class="flaticon-381-settings-2 me-0"></i></a>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">  Doctors</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover table-responsive-md">
              <thead>
              <tr>
                <th style="width:80px;"><strong>#</strong></th>
                <th><strong class="text-truncate">DR NAME</strong></th>
                <th><strong>GENDER</strong></th>
                <th><strong>SPECIALITY</strong></th>
                <th><strong>EMAIL</strong></th>
                <th><strong>PHONE</strong></th>
                <th><strong>ADDRESS</strong></th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(doctor,index) in doctorList" :key="index" @dblclick="detailsdoctor(doctor)">
                <td  ><strong>{{doctor.id}}</strong></td>
                <td class="text-truncate">Dr. {{doctor.name}}</td>
                <td>{{doctor.gender}}</td>
                <td>
                    <span :class="badgeClasses[doctor.speciality]">
                      {{ doctor.speciality }}
                    </span>
                </td>
                <td>{{doctor.email}}</td>
                <td>{{doctor.phone}}</td>
                <td class="text-truncate">{{doctor.address}}</td>
                <td>
                  <div class="dropdown">
                    <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                      <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" @click="updateDoctor(doctor.id)" href="javascript:void(0);">Edit</a>
                      <a class="dropdown-item" @click="deleteDoctor(doctor.id)" href="javascript:void(0);">Delete</a>
                      <a class="dropdown-item" @click="detailsdoctor(doctor.id)" href="javascript:void(0);">Details</a>

                    </div>
                  </div>
                </td>

              </tr>


              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoctorDataService from "@/services/DoctorDataService";
export default {
  name: "doctor-list",
  data(){
    return{
      doctorList: [],
      currentDoctor: null,
      currentIndex: -1,
      defaultPage: 0,
      defaultSize: 10,
      searchDoctor: "",
      badgeClasses: {
        DENTIST: 'badge light badge-warning',
        NEUROLOGIST: 'badge light badge-success',
        DERMATOLOGIST: 'badge light badge-danger',
        CARDIOLOGIST: 'badge light badge-default',
      },
    }
  },
  methods:{
    retrieveDoctors(){
      DoctorDataService.getAllDoctors(this.defaultPage,this.defaultSize)
        .then(response => {
          this.doctorList = response.data.doctors;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrievePatientsBySearch(event){
      this.name=event.target.value;

      DoctorDataService.getAllPatientsWithSearchTerm(this.searchDoctor, this.defaultPage, this.defaultSize)
          .then(response => {
            this.doctorList = response.data.doctors;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteDoctor(id){
      DoctorDataService.deleteDoctor(id)
          .then(response => {
            console.log(response.data);
            this.retrieveDoctors();
          })
          .catch(e => {
            console.log(e);
          });
    },
    updateDoctor(id){
      this.$router.push({name: 'edit-doctor', params: {id: id}});
    },
    detailsdoctor(doctor){
      this.$router.push({name: 'doctor-details', params: {id: doctor.id}});
    }
  },
  mounted(){
    this.retrieveDoctors();
  }
}
</script>

<style scoped>

</style>