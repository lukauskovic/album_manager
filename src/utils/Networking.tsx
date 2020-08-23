import axios from "axios"

const reqConfiguration = () => axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json'
})

export function getRequest(route : string, onSuccess : any, onFail : any){
  reqConfiguration().get(route)
    .then((response) => {
      response.status === 200 && onSuccess(response.data)
  })
  .catch((error) => {
      onFail(error)
  })
}