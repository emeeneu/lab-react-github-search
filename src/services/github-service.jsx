// singleton
import axios from 'axios';

class GithubApi {
  getUsers(value){
    return axios.get(`https://api.github.com/search/users?q=${value}+in:login`)
  }
}

export const githubApi = new GithubApi();