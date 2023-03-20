<template>
  <form>
    <div class="row">
      <div class="col-xl-1"></div>
      <div class="col-xl-10">
        <div class="form-group">
          <label for="message-text" class="col-form-label">the consultation patient :</label>
          <select class="form-control" name="patient" v-model="consultation.appointment">
            <option value="" disabled selected>Select the consultation patient</option>
            <option v-for="appointment in appointments" :key="appointment.id" :value="appointment">{{ appointment.patient.name }}</option>
          </select>
        </div>
      </div>
      <div class="col-xl-1"></div>
      <div class="col-xl-1"></div>

      <div class="col-xl-10">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Date :</label>
          <input size="16" type="date" name="date" v-model="consultation.date"  class="form-control">
        </div>
      </div>
      <div class="col-xl-1"></div>
      <div class="col-xl-1"></div>
      <div class="col-xl-10">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Price:</label>
          <input type="text" name="price" id="price" v-model="consultation.price" class="form-control"  placeholder="Price Of Consultation">
        </div>
      </div>
      <div class="col-xl-1"></div>
      <div class="col-xl-1"></div>


      <div class="col-xl-10">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Rapport :</label>
          <textarea class="form-control" name="rapport" v-model="consultation.rapport" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
      </div>
      <div class="col-xl-1"></div>
      <div class="col-xl-1"></div>
      <div class="col-xl-6"><button @click="saveConsultation" type="button" class="btn btn-primary">Save</button></div>
      <div class="col-xl-6"></div>





    </div>


  </form>
</template>

<script>
import ConsultationDataService from "@/services/ConsultationDataService";
import AppointmentDataService from "@/services/AppointmentDataService";
import router from "@/router";
export default {
  name: "add-consultation",
  data(){
    return{
      consultation:{
        id: null,
       rapport: "",
        price: "",
        date: "",
        appointment:""
      },
      appointments: []
    }
  },
  methods:{
    getAllAppointments(){
      AppointmentDataService.getAll()
        .then(response => {
          this.appointments = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveConsultation(){
      var data={
        rapport: this.consultation.rapport,
        price: this.consultation.price,
        date: this.consultation.date,
        appointment: this.consultation.appointment
      }
      console.log(data)
      ConsultationDataService.createConsultation(data)
        .then(response => {
          this.consultation = response.data;
          console.log(response.data);
          router.push('/consultations');
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getAllAppointments();
  }
}
</script>

<style scoped>

</style>