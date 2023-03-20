<template>
  <div class="form-head d-flex mb-3 mb-md-4 align-items-start">
    <div class="me-auto d-none d-lg-block">

      <router-link to="/consultations/add-consultation"  class="btn btn-primary btn-rounded"> + Add New</router-link>

    </div>


  </div>

  <!-- row -->
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Consultations </h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover table-responsive-md">
              <thead>
              <tr>
                <th style="width:80px;"><strong>#</strong></th>
                <th><strong>Rapport</strong></th>
                <th><strong>Date  </strong></th>
                <th><strong>Price</strong></th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(consultation) in consultationList" :key="consultation.id" @dblclick="detailsConsultation(consultation.id)">
                <td><strong>{{consultation.id}}</strong></td>

                <td class="text-truncate" style="max-width: 240px;">{{consultation.rapport }}</td>

                <td>{{ new Date(consultation.date).toLocaleString('fr-FR', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' }) }}</td>

                <td>{{parseInt(consultation.price)}}</td>



                <td>
                  <div class="dropdown">
                    <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                      <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                    </button>
                    <div class="dropdown-menu">

                  <!--  <a class="dropdown-item" @click="updateConsultation(consultation.id)" href="javascript:void(0);"><i class="fas fa-pencil-alt p-2"></i>Edit</a>-->
                      <a class="dropdown-item" @click="deleteConsultation(consultation.id)" href="javascript:void(0);"><i class="fas fa-trash-alt p-2"></i>Delete</a>
                      <!--  <a class="dropdown-item" @click="detailsConsultation(consultation.id)" href="javascript:void(0);"><i class="fas fa-eye p-2"></i>Details</a>-->

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
import ConsultationDataService from "@/services/ConsultationDataService";
export default {
  name: "consultation-list",
  data(){
    return{
      consultationList: [],
      currentPage: 0,
      defaultSize: 5,
      totalConsultations: 0,
      totalPages: 0,
    }
  },
  methods:{
    retrieveConsultations(){
      ConsultationDataService.getAllConsultations(this.currentPage, this.defaultSize)
        .then(response => {
          this.consultationList = response.data.consultations;
          this.totalConsultations = response.data.totalElements;
          this.totalPages = response.data.totalPages;
        })
        .catch(e => {
          console.log(e);
        });
    },
    goToPage(page){
      this.currentPage = page;
      this.retrieveConsultations();
    },
    nextPage(){
      this.currentPage++;
      this.retrieveConsultations();
    },
    previousPage(){
      this.currentPage--;
      this.retrieveConsultations();
    },
    detailsConsultation(id){
      this.$router.push({name: 'consultation-details', params: {id: id}});
    },
    updateConsultation(id){
      this.$router.push({name: 'edit-consultation', params: {id: id}});
    },
    deleteConsultation(id){
      ConsultationDataService.deleteConsultation(id)
        .then(() => {
          this.retrieveConsultations();
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted(){
    this.retrieveConsultations();
  }
}
</script>

<style scoped>

</style>