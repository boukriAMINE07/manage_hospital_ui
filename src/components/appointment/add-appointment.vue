<template>
  <form>
    <div class="row">



      <div class="col-xl-1"></div>
      <div class="col-xl-10">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Dr Name:</label>
          <select class="form-control" name="doctor" v-model="appointment.doctor">
            <option  value="" disabled selected>Select a doctor</option>
            <option v-for="doctor in doctors" :key="doctor.id" :value="doctor">{{ doctor.name }}</option>
          </select>
        </div>
      </div>
      <div class="col-xl-1"></div>
      <div class="col-xl-1"></div>
      <div class="col-xl-10">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Patient Name:</label>
          <select class="form-control" name="patient" v-model="appointment.patient">
            <option value="" disabled selected>Select a patient</option>
            <option v-for="patient in patients" :key="patient.id" :value="patient">{{ patient.name }}</option>
          </select>
        </div>
      </div>

      <div class="col-xl-1"></div>
      <div class="col-xl-1"></div>
      <div class="col-xl-10">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Date Of Appointment:</label>
          <input size="16" type="date"  name="date" v-model="appointment.date" class="form-control">
        </div>
      </div>
      <div class="col-xl-1"></div>
      <div class="col-xl-1"></div>
      <div class="col-xl-10">
        <div class="form-group">
          <label for="message-text" class="col-form-label">Status Of Appointment:</label>
          <select class="form-control" name="statusAppointment" v-model="appointment.statusAppointment">
            <option value="" disabled selected>Select a status</option>
            <option value="WAITING">WAITING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="CANCELED">CANCELED</option>
          </select>
        </div>
      </div>
      <div class="col-xl-1"></div>
      <div class="col-xl-1"></div>


      <div class="col-xl-6"><button @click="saveAppointment" type="button" class="btn btn-primary">Save</button></div>
      <div class="col-xl-6"></div>





    </div>


  </form>
</template>
<script>
import DoctorDataService from "@/services/DoctorDataService";
import PatientDataService from "@/services/PatientDataService";
import AppointmentDataService from "@/services/AppointmentDataService";
import router from "@/router";

export default {
  name: "add-appointment",
  data() {
    return {
      appointment: {
        doctor: '',
        patient: '',
        date: "",
        statusAppointment: "WAITING",
      },
      doctors: [],
      patients: [],

    };
  },
  methods: {
    getDoctors() {
      DoctorDataService.getAll()
        .then((response) => {
          this.doctors = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPatients() {
      PatientDataService.getAll()
        .then((response) => {
          this.patients = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    saveAppointment(){
      var data={
        doctor: this.appointment.doctor,
        patient: this.appointment.patient,
        date: this.appointment.date,
        statusAppointment: this.appointment.statusAppointment
      }
      console.log(data)
      AppointmentDataService.createAppointment(data)
        .then(response => {
          this.appointment.id = response.data.id;
          console.log(response.data);
          router.push('/appointments');
        })
        .catch(e => {
          console.log(e);
        });
    }

  },
  mounted() {
    this.getDoctors();
    this.getPatients();

  }
}
</script>

<style scoped>

</style>