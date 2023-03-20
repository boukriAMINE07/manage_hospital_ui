import http from "../http-common";
class DoctorDataService{
    getAllDoctors(page, size){
        return http.get(`/doctors?page=${page}&size=${size}`);
    }
    getAll(){
        return http.get("/doctors/all");
    }
    getAllPatientsWithSearchTerm(searchTerm,page, size ){
        return http.get(`/doctors?name=${searchTerm}&page=${page}&size=${size}`);
    }
    getDoctor(id){
        return http.get(`/doctors/${id}`);
    }
    createDoctor(data){
        return http.post("/doctors", data);
    }
    updateDoctor(id, data){
        return http.put(`/doctors/${id}`, data);
    }
    deleteDoctor(id){
        return http.delete(`/doctors/${id}`);
    }
}
export default new DoctorDataService();