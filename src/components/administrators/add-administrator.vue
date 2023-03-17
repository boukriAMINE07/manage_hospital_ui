<template>
  <form>
    <div class="row">

      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Name:</label>
          <input type="text" name="name" id="name" v-model="administrator.name" class="form-control"  placeholder="Name">
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Email Id:</label>
          <input type="email" name="email" v-model="administrator.email" class="form-control"  placeholder="Email">
        </div>
      </div>

      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Password:</label>
          <input type="text" name="password" v-model="administrator.password" class="form-control"  placeholder="Password">
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Mobile No:</label>
          <input type="number" name="phone" v-model="administrator.phone" class="form-control" id="" placeholder="Mobile">
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group">
          <label for="message-text" class="col-form-label"  >ROLE:</label>
          <select  class="form-control" name="role" v-model="administrator.role">
            <option value="CHIEF_OPERATING">CHIEF_OPERATING</option>
            <option value="CHIEF_TECHNOLOGY">CHIEF_TECHNOLOGY</option>
          </select>
        </div>
      </div>





      <div class="col-xl-12">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Address :</label>
          <textarea class="form-control" name="address" v-model="administrator.address" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
      </div>


      <div class="col-xl-6"><button @click="saveAdministrator" type="button" class="btn btn-primary">Save</button></div>
      <div class="col-xl-6"></div>





    </div>


  </form>
</template>

<script>
import AdministratorDataService  from "@/services/AdministratorDataService";
import router from "@/router";
export default {
  name: "add-administrator",
  data(){
    return{
      administrator:{
        id: null,
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        role: "CHIEF_OPERATING",
      }
    }
  },
  methods:{
    saveAdministrator(){
      let data = {
        name: this.administrator.name,
        email: this.administrator.email,
        password: this.administrator.password,
        address: this.administrator.address,
        phone: this.administrator.phone,
        role: this.administrator.role,
      };
      console.log(data)
      AdministratorDataService.createAdministrator(data)
        .then(response => {
          this.administrator = response.data;
          console.log(response.data);
          router.push('/administrators');
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