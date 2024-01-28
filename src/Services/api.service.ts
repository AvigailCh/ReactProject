import axios from 'axios'
export default new class ApiService{
    BASE_URL="https://jsonplaceholder.typicode.com"

    getListUsers(){
        return axios.get(`${this.BASE_URL}/users`);
    }

}