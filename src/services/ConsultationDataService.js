import http from "../http-common";
class ConsultationDataService {

    getAllConsultations(page, size) {
        return http.get(`/consultations?page=${page}&size=${size}`);
    }
    getAll() {
        return http.get("/consultations/all");
    }
    getConsultation(id) {
        return http.get(`/consultations/${id}`);
    }
    createConsultation(data) {
        return http.post("/consultations", data);
    }
    updateConsultation(id, data) {
        return http.put(`/consultations/${id}`, data);
    }
    deleteConsultation(id) {
        return http.delete(`/consultations/${id}`);
    }
}

export default new ConsultationDataService();