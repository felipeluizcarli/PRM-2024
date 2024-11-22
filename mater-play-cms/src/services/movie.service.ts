import { Update } from './../../node_modules/@remix-run/router/dist/history.d';
import { API } from "../@libs/axios"
import { IMovie } from "../@libs/types";

const _ENDPOINT = '/movies';

const getAll = () => (API.get(_ENDPOINT));
const getById = (id: string) => (API.get(`${_ENDPOINT}/${id}`));
const remove = (id: string) => (API.delete(`${_ENDPOINT}/${id}`));  
const create = (data: IMovie) => (API.post(_ENDPOINT, data));
const update = (id: string, data: IMovie) => (API.put(`${_ENDPOINT}/${id}`, data));
const Update = (file:file) =>{
  const formdata = new FormData():
  formdata.append('file', file);


  return API.post(`&{_ENDPOINT}/upload` , formdata){
    headers : {
      'content-Type' : 'multipart/form-data'
    }
  }
}

export const MovieService = {
  getAll,
  getById,
  create,
  update,
  remove
}