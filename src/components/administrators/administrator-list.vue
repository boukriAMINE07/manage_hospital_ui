<template>
  <div class="form-head d-flex mb-3 mb-md-4 align-items-start">
    <div class="me-auto d-none d-lg-block">

      <router-link to="/administrators/add-administrator"  class="btn btn-primary btn-rounded"> + Add New</router-link>

    </div>

    <div class="input-group search-area ms-auto d-inline-flex me-3">
      <input type="text" v-model="searchAdministrator" class="form-control" @keyup="retrieveAdministratorBySearch" placeholder="Search here">
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
          <h4 class="card-title">  Administrators</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover table-responsive-md">
              <thead>
              <tr>
                <th style="width:80px;"><strong>#</strong></th>
                <th><strong class="text-truncate">NAME</strong></th>
                <th><strong>EMAIL</strong></th>
                <th><strong>ROLE</strong></th>
                <th><strong>PHONE</strong></th>
                <th><strong>ADDRESS</strong></th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(administrator,index) in administratorList" :key="index" @dblclick="detailsAdministrator(administrator)">
                <td  ><strong>{{administrator.id}}</strong></td>
                <td class="text-truncate">Dr. {{administrator.name}}</td>
                <td>{{administrator.email}}</td>
                <td v-if="administrator.role==='CHIEF_TECHNOLOGY'">
                  <span  class="badge light badge-success"   >CHIEF TECHNOLOGY</span>
                </td>
                <td v-else>
                  <span  class="badge light  badge-danger"  >CHIEF OPERATING</span>
                </td>
                <td>{{administrator.phone}}</td>
                <td class="text-truncate">{{administrator.address}}</td>
                <td>
                  <div class="dropdown">
                    <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                      <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" @click="updateAdministrator(administrator.id)" href="javascript:void(0);">Edit</a>
                      <a class="dropdown-item" @click="deleteAdministrator(administrator.id)" href="javascript:void(0);">Delete</a>
                      <a class="dropdown-item" @click="detailsAdministrator(administrator)" href="javascript:void(0);">Details</a>

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
import AdministratorDataService from "@/services/AdministratorDataService";
export default {
  name: "administrator-list",
  data(){
    return{
      administratorList: [],
      currentPage: 0,
      defaultSize: 5,
      searchAdministrator: "",
      totalAdministrator: 0,
      totalPages: 0,

    }
  },
  methods:{
    retrieveAdministrator(){
      AdministratorDataService.getAllAdministrator(this.currentPage,this.defaultSize)
        .then(response => {
          this.administratorList = response.data.administrators;
          this.totalAdministrator = response.data.totalItems;
          this.totalPages= response.data.totalPages;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveAdministratorBySearch(){
      this.currentPage=0;
      AdministratorDataService.getALlAdministratorWithSearchTerm(this.searchAdministrator,this.currentPage,this.defaultSize)
        .then(response => {
          this.administratorList = response.data.administrators;
          this.totalAdministrator = response.data.totalItems;
          this.totalPages= response.data.totalPages;
          //console.log(this.administratorList);
        })
        .catch(e => {
          console.log(e);
        });
    },
    previousPage() {
      this.currentPage--;
      this.retrieveAdministrator();
    },
    nextPage() {
      this.currentPage++;
      this.retrieveAdministrator();
    },
    goToPage(page) {
      this.currentPage = page;
      this.retrieveAdministrator();
    },
    detailsAdministrator(administrator){
      this.$router.push({name: 'administrator-details', params: {id: administrator.id}});
    },
    updateAdministrator(id){
      this.$router.push({name: 'edit-administrator', params: {id: id}});
    },
    deleteAdministrator(id){
      AdministratorDataService.deleteAdministrator(id)
        .then(response => {
          console.log(response.data.administrators);
          this.retrieveAdministrator();
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveAdministrator();
  }

}
</script>

<style scoped>

</style>