<template>
  <form>
    <div class="row">

      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Name:</label>
          <input type="text" name="name" id="name" v-model="patient.name" class="form-control"  placeholder="Name">
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Email Id:</label>
          <input type="email" name="email" v-model="patient.email" class="form-control"  placeholder="Email">
        </div>
      </div>

      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Date Of Birth:</label>
          <input size="16" type="date" name="birthdate" v-model="patient.birthdate"  class="form-control">
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Mobile No:</label>
          <input type="number" name="phone" v-model="patient.phone" class="form-control" id="" placeholder="Mobile">
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label"  >Gender:</label>
          <select  class="form-control" name="gender" v-model="patient.gender">
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label"  >Sick :</label>
          <select  class="form-control" name="sick" v-model="patient.sick">
            <option value="true">YES</option>
            <option value="false">NO</option>
          </select>
        </div>
      </div>




      <div class="col-xl-12">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Address :</label>
          <textarea class="form-control" name="address" v-model="patient.address" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
      </div>


      <div class="col-xl-6"><button @click="editPatient" type="button" class="btn btn-primary">UPDATE  </button></div>
      <div class="col-xl-6"></div>
    </div>


  </form>
</template>

<script>

import PatientDataService  from "@/services/PatientDataService";
export default {
  name: "edit-patient",
  data(){
    return{
      id: this.$route.params.id,
      patient:{
        id: null,
        name: "",
        phone: "",
        email: "",
        address: "",
        gender: "MALE",
        birthdate: "",
        sick: false
      }

    }
  },
  methods:{
    getPatient(){
      PatientDataService.getPatient(this.id)
      .then(response => {
        console.log(response.data)
        this.patient = response.data;
      })
      .catch(e => {
        console.log(e);
      });
    },
    editPatient(){
      PatientDataService.updatePatient(this.id, this.patient)
      .then(() => {
        this.$router.push('/patients');
      })
      .catch(e => {
        console.log(e);
      });
    }
  },
  mounted() {
    this.getPatient();
  }
}
</script>

<style scoped>

</style>