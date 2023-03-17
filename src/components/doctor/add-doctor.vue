<template>
  <form>
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
          <input type="password" name="password" v-model="doctor.password" class="form-control"  placeholder="Password">
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


      <div class="col-xl-6"><button @click="saveDoctor" type="button" class="btn btn-primary">Save</button></div>
      <div class="col-xl-6"></div>





    </div>


  </form>
</template>

<script>
import DoctorDataService from "@/services/DoctorDataService";
import router from "@/router";
export default {
  name: "add-doctor",
  data(){
    return{

      doctor:{
        id: null,
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        speciality: "DERMATOLOGIST",
        gender: "MALE"
      }
    }
  },
  methods:{
    saveDoctor(){
      var data={
        name: this.doctor.name,
        email: this.doctor.email,
        password: this.doctor.password,
        address: this.doctor.address,
        phone: this.doctor.phone,
        speciality: this.doctor.speciality,
        gender: this.doctor.gender
      }
      console.log(data)
      DoctorDataService.createDoctor(data)
        .then(response => {
          this.doctor.id = response.data.id;
          console.log(response.data);
          router.push('/doctors');
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
}
</script>

<style scoped>

</style>