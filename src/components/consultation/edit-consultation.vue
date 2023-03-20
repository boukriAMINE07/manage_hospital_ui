<template>
  <form>
    <div class="row">

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
      <div class="col-xl-6"><button @click="editConsultation" type="button" class="btn btn-primary">Edit</button></div>
      <div class="col-xl-6"></div>





    </div>


  </form>
</template>

<script>
import ConsultationDataService from "@/services/ConsultationDataService";
export default {
  name: "edit-consultation",
  data() {
    return {
      consultation: {
        id: null,
        date: null,
        price: null,
        rapport: null,
        appointment: null,
      },

    };
  },
  methods:{

    getConsultation(id){
      ConsultationDataService.getConsultation(id)
      .then(response => {
        this.consultation = response.data;
        this.consultation.appointment=response.data.appointment.id;
console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    },

    editConsultation(){
      ConsultationDataService.updateConsultation(this.consultation.id, this.consultation)
      .then(() => {
        this.$router.push("/consultations");
      })
      .catch(e => {
        console.log(e);
      });
    }
  },
  mounted() {
    this.getConsultation(this.$route.params.id);


  }

}
</script>

<style scoped>

</style>