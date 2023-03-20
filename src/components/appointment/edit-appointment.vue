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
          <label for="message-text" class="col-form-label">Consultation:</label>
          <select class="form-control" name="consultation" v-model="appointment.consultation">
            <option value="" disabled selected>Select a patient</option>
            <option v-for="consultation in consultations" :key="consultation.id" :value="consultation">{{ consultation.rapport }}</option>
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



      <div class="col-xl-6"><button @click="editAppointment" type="button" class="btn btn-primary">Edit</button></div>
      <div class="col-xl-6"></div>





    </div>


  </form>
</template>

<script>
import DoctorDataService from "@/services/DoctorDataService";
import PatientDataService from "@/services/PatientDataService";
import AppointmentDataService from "@/services/AppointmentDataService";
import ConsultationDataService from "@/services/ConsultationDataService";
import router from "@/router";
export default {
  name: "edit-appointment",
  data() {
    return {
      appointment: {
        id: null,
        doctor: null,
        patient: null,
        consultation: null,
        date: null,
        statusAppointment: null,
      },
      doctors: [],
      patients: [],
      consultations: [],
    };
  },
  methods: {
    editAppointment() {
      AppointmentDataService.updateAppointment(this.appointment.id, this.appointment)
        .then(response => {
          this.appointment = response.data;
          console.log(response.data);
          router.push("/appointments");
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveAppointment(id) {
      AppointmentDataService.getAppointment(id)
        .then(response => {
          this.appointment = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveDoctors() {
      DoctorDataService.getAll()
        .then(response => {
          this.doctors = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrievePatients() {
      PatientDataService.getAll()
        .then(response => {
          this.patients = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveConsultations() {
      ConsultationDataService.getAll()
        .then(response => {
          this.consultations = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveAppointment(this.$route.params.id);
    this.retrieveDoctors();
    this.retrievePatients();
    this.retrieveConsultations();
  }
}
</script>

<style scoped>

</style>