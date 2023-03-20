import http from "../http-common";

class PatientDataService{

    getAllPatients(page, size){
        return http.get(`/patients?page=${page}&size=${size}`);
    }

    getAll(){
        return http.get(`/patients/all`);
    }
    //get all patients with a search term and page number and size
    getAllPatientsWithSearchTerm(searchTerm,page, size ){
        return http.get(`/patients?name=${searchTerm}&page=${page}&size=${size}`);
    }

    getPatient(id){
        return http.get(`/patients/${id}`);
    }

    createPatient(data){
        return http.post("/patients", data);
    }
    updatePatient(id, data){
        return http.put(`/patients/${id}`, data);
    }
    deletePatient(id){
        return http.delete(`/patients/${id}`);
    }

}

export default new PatientDataService();