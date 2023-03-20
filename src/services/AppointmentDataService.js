import http from '../http-common';
class AppointmentDataService{
    getAllAppointments(page, size){
        return http.get(`/appointments?page=${page}&size=${size}`);
    }
    getAll(){
        return http.get("/appointments/all");
    }
    getAllAppointmentsWithSearchTerm(searchTerm, page, size){
        return http.get(`/appointments?name=${searchTerm}&page=${page}&size=${size}`);
    }
    getAppointment(id){
        return http.get(`/appointments/${id}`);
    }
    createAppointment(data){
        return http.post("/appointments", data);
    }
    updateAppointment(id, data){
        return http.put(`/appointments/${id}`, data);
    }
    deleteAppointment(id){
        return http.delete(`/appointments/${id}`);
    }
}
export default new AppointmentDataService();