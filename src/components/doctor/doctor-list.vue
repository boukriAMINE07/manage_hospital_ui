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
              <tr v-for="(doctor,index) in doctorList" :key="index" @dblclick="detailsDoctor(doctor)">
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
                      <a class="dropdown-item" @click="detailsDoctor(doctor.id)" href="javascript:void(0);">Details</a>

                    </div>
                  </div>
                </td>

              </tr>


              </tbody>
            </table>
            <div v-if="totalPages > 0">


              <nav>
                <ul class="pagination text-center pagination-gutter">
                  <li class="page-item page-indicator" v-show="currentPage > 0" @click="previousPage">
                    <a class="page-link" href="javascript:void(0)">
                      <i class="la la-angle-left"></i></a>
                  </li>
                  <li class="page-item " v-for="page in totalPages" :key="page-1" @click="goToPage(page-1)" :class="{ active: page-1 === currentPage }"><a class="page-link" href="javascript:void(0)">{{page}}</a>
                  </li>

                  <li class="page-item page-indicator"  v-show="currentPage+1 <totalPages" @click="nextPage">
                    <a class="page-link" href="javascript:void(0)">
                      <i class="la la-angle-right"></i></a>
                  </li>
                </ul>
              </nav>
            </div>
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
      currentPage: 0,
      defaultSize: 5,
      searchDoctor: "",
      totalDoctors: 0,
      totalPages: 0,
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
      DoctorDataService.getAllDoctors(this.currentPage,this.defaultSize)
        .then(response => {
          this.doctorList = response.data.doctors;
          this.totalDoctors = response.data.totalItems;
          this.totalPages= response.data.totalPages;
          //console.log(response.data.doctors);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrievePatientsBySearch(event){
      this.name=event.target.value;
      this.currentPage=0;

      DoctorDataService.getAllPatientsWithSearchTerm(this.searchDoctor, this.currentPage, this.defaultSize)
          .then(response => {
            this.doctorList = response.data.doctors;
            this.totalDoctors = response.data.totalItems;
            this.totalPages= response.data.totalPages;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    previousPage() {
      this.currentPage--;
      this.retrieveDoctors();
    },
    nextPage() {
      this.currentPage++;
      this.retrieveDoctors();
    },
    goToPage(page) {
      this.currentPage = page;
      this.retrieveDoctors();
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
    detailsDoctor(doctor){
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