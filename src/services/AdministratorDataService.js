
import http from "../http-common";
class AdministratorDataService{
    getAllAdministrator(page, size){
        return http.get(`/administrators?page=${page}&size=${size}`);
    }
    getALlAdministratorWithSearchTerm(searchTerm, page, size){
        return http.get(`/administrators?name=${searchTerm}&page=${page}&size=${size}`);
    }
    getAdministrator(id){
        return http.get(`/administrators/${id}`);
    }
    createAdministrator(data){
        return http.post("/administrators", data);
    }
    updateAdministrator(id, data){
        return http.put(`/administrators/${id}`, data);
    }
    deleteAdministrator(id){
        return http.delete(`/administrators/${id}`);
    }
}

export default new AdministratorDataService();
