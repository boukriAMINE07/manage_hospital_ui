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


      <div class="col-xl-6"><button @click="savePatient" type="button" class="btn btn-primary">Save</button></div>
      <div class="col-xl-6"></div>





    </div>


  </form>
</template>

<script>
import PatientDataService from "@/services/PatientDataService";
import router  from "@/router";

export default {
  name: "add-patient",
  data(){
    return{
      patient:{
        id:null,
        name: "",
        phone: "",
        email: "",
        address: "",
        gender: "MALE",
        birthdate: "",
        sick: false
      },
      submitted: false
    };
  },
  methods: {
    savePatient(){
      var data={
        name: this.patient.name,
        phone: this.patient.phone,
        email: this.patient.email,
        address: this.patient.address,
        gender: this.patient.gender,
        birthdate: this.patient.birthdate,
        sick: this.patient.sick
      };
      console.log(data)
      PatientDataService.createPatient(data)
        .then(response => {
          this.patient.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          router.push('/patients');
        })
        .catch(e => {
          console.log(e);
        });

    },

  }
}
</script>

<style scoped>

</style>