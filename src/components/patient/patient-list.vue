<template>
  <div class="form-head d-flex mb-3 mb-md-4 align-items-start">
    <div class="me-auto d-none d-lg-block">

        <router-link to="/patients/add-patient"  class="btn btn-primary btn-rounded"> + Add New</router-link>

    </div>

    <div class="input-group search-area ms-auto d-inline-flex me-3">
      <input type="text" v-model="searchPatient" class="form-control" @keyup="retrievePatientsBySearch" placeholder="Search here">
      <div class="input-group-append">
        <button type="button"   class="input-group-text">
          <i class="flaticon-381-search-2"></i></button>
      </div>
    </div>
    <a href="javascript:void(0);" class="settings-icon"><i class="flaticon-381-settings-2 me-0"></i></a>
  </div>

  <!-- row -->
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Patients </h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover table-responsive-md">
              <thead>
              <tr>
                <th style="width:80px;"><strong>#</strong></th>
                <th><strong>PATIENT</strong></th>
                <th><strong>ADDRESS  </strong></th>
                <th><strong>EMAIL</strong></th>
                <th><strong>BIRTH_DATE</strong></th>
                <th><strong>GENDER</strong></th>
                <th><strong>SICK</strong></th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(patient) in patientList" :key="patient.id" @dblclick="detailsPatient(patient)">
                <td><strong>{{patient.id}}</strong></td>
                <td v-if="patient.gender==='MALE'" >Mr.{{patient.name}}</td>
                <td v-else >Mme.{{patient.name}}</td>
                <td class="text-truncate">{{patient.address }}</td>
                <td>{{patient.email}}</td>
                <td>{{patient.birthdate}}</td>
                <td v-if="patient.gender==='MALE'">
                  <span  class="badge light badge-success"   >MALE</span>
                </td>
                <td v-else>
                  <span  class="badge light  badge-danger"  >FEMALE</span>

                </td>

                <td>
                  <span v-if="patient.sick" class="badge light badge-danger"   >YES</span>
                  <span v-else class="badge light badge-success"  >NO</span>
                </td>
                <td>
                  <div class="dropdown">
                    <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                      <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item"  @click="updatePatient(patient.id)" href="javascript:void(0);">Edit</a>
                      <a class="dropdown-item"  @click="deletePatient(patient.id)"  href="javascript:void(0);">Delete</a>
                    </div>
                  </div>
                </td>
              </tr>


              </tbody>
            </table>
            <div v-if="totalPages > 0">


              <nav>
                <ul class="pagination pagination-gutter">
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
import PatientDataService from "../../services/PatientDataService";

export default {
  name: "patient-list",
  data(){
    return{
      patientList: [],
      currentPage: 0,
      defaultSize: 5,
      searchPatient: "",
      totalPatients: 0,
      totalPages: 0,

    }
  },

  methods: {
    retrievePatients(){

      PatientDataService.getAllPatients(this.currentPage, this.defaultSize)
        .then(response => {
          this.patientList = response.data.patients;
          this.totalPatients = response.data.totalItems;
          this.totalPages= response.data.totalPages;
          console.log(this.patientList);
        })
        .catch(e => {
          console.log(e);
        });
    },
      previousPage() {
        this.currentPage--;
        this.retrievePatients();
      },
      nextPage() {
        this.currentPage++;
        this.retrievePatients();
      },
      goToPage(page) {
        this.currentPage = page;
        this.retrievePatients();
      },
    retrievePatientsBySearch(event){
      this.name=event.target.value;
      this.currentPage=0;

      PatientDataService.getAllPatientsWithSearchTerm(this.searchPatient, this.currentPage, this.defaultSize)
        .then(response => {
          this.patientList = response.data.patients;
          this.totalPatients = response.data.totalItems;
          this.totalPages= response.data.totalPages;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    deletePatient(id){
      PatientDataService.deletePatient(id)
        .then(response => {
          console.log(response.data);
          this.retrievePatients();
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePatient(id){
      this.$router.push({name: 'edit-patient', params: {id: id}});
    },
    detailsPatient(patient){
      this.$router.push({name: 'patient-details', params: {id: patient.id}});
    }

  },
  mounted() {
    this.retrievePatients()
  }
}



</script>





<style scoped>

</style>