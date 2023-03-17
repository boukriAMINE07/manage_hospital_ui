<template>
  <form class="mt-5">
    <div class="row">

      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Name:</label>
          <input type="text" name="name" id="name" v-model="doctor.name" class="form-control"  placeholder="Name">
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Email Id:</label>
          <input type="email" name="email" v-model="doctor.email" class="form-control"  placeholder="Email">
        </div>
      </div>

      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Password:</label>
          <input type="text" name="password" v-model="doctor.password" class="form-control"  placeholder="Password">
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Mobile No:</label>
          <input type="number" name="phone" v-model="doctor.phone" class="form-control" id="" placeholder="Mobile">
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label"  >Gender:</label>
          <select  class="form-control" name="gender" v-model="doctor.gender">
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label"  >Speciality :</label>
          <select  class="form-control" name="speciality" v-model="doctor.speciality">
            <option value="CARDIOLOGIST">CARDIOLOGIST</option>
            <option value="DERMATOLOGIST">DERMATOLOGIST</option>
            <option value="NEUROLOGIST">NEUROLOGIST</option>
            <option value="DENTIST">DENTIST</option>
          </select>
        </div>
      </div>




      <div class="col-xl-12">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Address :</label>
          <textarea class="form-control" name="address" v-model="doctor.address" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
      </div>


      <div class="col-xl-6"><button @click="editDoctor" type="button" class="btn btn-primary">UPDATE</button></div>
      <div class="col-xl-6"></div>





    </div>


  </form>
</template>

<script>
import DoctorDataService from "@/services/DoctorDataService";
export default {
  name: "edit-doctor",
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
    editDoctor(){
      DoctorDataService.updateDoctor(this.id, this.doctor)
        .then(response => {
          console.log(response.data);
          this.$router.push({name: 'doctor-list'});
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted(){
    this.getDoctor();
  }
}
</script>

<style scoped>

</style>