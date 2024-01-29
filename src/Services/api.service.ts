import axios from 'axios'
export default new class ApiService{
    BASE_URL="https://jsonplaceholder.typicode.com"

    getListUsers(){
        return axios.get(`${this.BASE_URL}/users`);
    }
    inserNewApi(api:any){
        return axios.post(`${this.BASE_URL}/users`,api)
    }
    deleteUser(user:any){
        return axios.post(`${this.BASE_URL}/users`,user)
    }
}