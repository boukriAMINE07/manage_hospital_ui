<template>

  <!--**********************************
      Content body start
  ***********************************-->

  <div class="form-head d-flex mb-3 mb-md-4 align-items-start">
    <div class="me-auto d-none d-lg-block">

      <router-link to="/appointments/add-appointment"  class="btn btn-primary btn-rounded"> + Add New</router-link>

    </div>

    <div class="input-group search-area ms-auto d-inline-flex me-3">
      <input type="text" v-model="searchByPatient" class="form-control" @keyup="retrieveAppointmentBySearch" placeholder="Search here by patient name">
      <div class="input-group-append">
        <button type="button"   class="input-group-text">
          <i class="flaticon-381-search-2"></i></button>
      </div>
    </div>
  </div>
      <!-- row -->
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Appointments</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover table-responsive-md">
                  <thead>
                  <tr>
                    <th style="width:80px;"><strong>#</strong></th>
                    <th><strong>PATIENT</strong></th>
                    <th  class="text-truncate"><strong>DR NAME</strong></th>
                    <th><strong>DATE</strong></th>
                    <th><strong>STATUS</strong></th>
                    <th class="text-truncate"><strong>RAPPORT OF CONSULTATION</strong></th>
                    <th><strong>PRICE</strong></th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(appointment,index) in appointmentList" :key="index" @dblclick="detailsAppointment(appointment)">
                    <td><strong>{{appointment.id}}</strong></td>
                    <td class="text-truncate">Mr. {{appointment.patient.name}}</td>
                    <td  class="text-truncate">Dr. {{appointment.doctor.name}}</td>
                    <td class="text-truncate">{{ new Date(appointment.date).toLocaleString('fr-FR', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' }) }}</td>
                    <td v-bind:class="{'text-warning': appointment.statusAppointment === 'WAITING', 'text-success': appointment.statusAppointment === 'CONFIRMED', 'text-danger': appointment.statusAppointment === 'CANCELED'}">
                      <div class="d-flex align-items-center">
                        <i v-if="appointment.statusAppointment === 'WAITING'" class="fa fa-circle text-warning me-1"></i>
                        <i v-if="appointment.statusAppointment === 'CONFIRMED'" class="fa fa-circle text-success me-1"></i>
                        <i v-if="appointment.statusAppointment === 'CANCELED'" class="fa fa-circle text-danger me-1"></i>
                        {{ appointment.statusAppointment }}
                      </div>
                    </td>
                    <td v-if="appointment.consultation!=null" class="text-truncate" style="max-width: 180px">{{appointment.consultation.rapport}} </td>
                    <td v-else class="text-truncate">No Consultation</td>
                    <td v-if="appointment.consultation!=null" class="text-truncate">{{parseInt(appointment.consultation.price)}} MAD</td>
                    <td v-else class="text-truncate">No Consultation</td>


                    <td>
                      <div class="dropdown">
                        <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                          <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                        </button>
                        <div class="dropdown-menu">
                          <a class="dropdown-item" @click="updateAppointment(appointment)" href="javascript:void(0);"><i class="fas fa-pencil-alt p-2"></i>Edit</a>
                          <a class="dropdown-item" @click="deleteAppointment(appointment)" href="javascript:void(0);"><i class="fas fa-trash-alt p-2"></i>Delete</a>
                          <a class="dropdown-item" @click="detailsAppointment(appointment)" href="javascript:void(0);"><i class="fas fa-eye p-2"></i>Details</a>
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

  <!--**********************************
      Content body end
  ***********************************-->
</template>

<script>
import AppointmentDataService from "@/services/AppointmentDataService";
export default {
  name: "appointment-list",
  data() {
    return {
      appointmentList: [],
      currentPage: 0,
      defaultSize: 8,
      searchByPatient: "",
      totalAppointment: 0,
      totalPages: 0,
    };
  },
  methods:{
    retrieveAppointment(){
      AppointmentDataService.getAllAppointments(this.currentPage, this.defaultSize)
        .then(response => {
          this.appointmentList = response.data.appointments;
          this.totalAppointment = response.data.totalItems;
          this.totalPages= response.data.totalPages;

          console.log(response.data)
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveAppointmentBySearch(){
      this.currentPage = 0;
      console.log(this.searchByPatient)

      AppointmentDataService.getAllAppointmentsWithSearchTerm( this.searchByPatient,this.currentPage, this.defaultSize)
        .then(response => {
          console.log(response.data)
          this.appointmentList = response.data.appointments;
          this.totalAppointment = response.data.totalItems;
          this.totalPages= response.data.totalPages;
        })
        .catch(e => {
          console.log(e);
        });
    },
    previousPage() {
      this.currentPage--;
      this.retrieveAppointment();
    },
    nextPage() {
      this.currentPage++;
      this.retrieveAppointment();
    },
    goToPage(page) {
      this.currentPage = page;
      console.log(this.currentPage)
      this.retrieveAppointment();
    },
    detailsAppointment(appointment){
      this.$router.push({name: 'appointment-details', params: {id: appointment.id}});
    },
    updateAppointment(appointment){
      this.$router.push({name: 'edit-appointment', params: {id: appointment.id}});
    },
    deleteAppointment(appointment){
      AppointmentDataService.deleteAppointment(appointment.id)
        .then(() => {
          this.retrieveAppointment();
        })
        .catch(e => {
          console.log(e);

        });
    }
  },
  mounted() {
    this.retrieveAppointment();
  }

}
</script>

<style scoped>

</style>