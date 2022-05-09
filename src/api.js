import axios from "axios";


const DEFAULT_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
}

const AUTH_HEADERS = (authToken) => {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        "Authorization": `Bearer ${authToken}`
    }
}
export const fetchOrder = (params, authToken) => axios.post(`${process.env.REACT_APP_API_URL}/order`, params, {headers: AUTH_HEADERS(authToken)});
export const updateUser = (id, params, authToken) => axios.put(`${process.env.REACT_APP_API_URL}/user/${id}`, params,  {headers: AUTH_HEADERS(authToken)});

export const fetchSeat = (id) => axios.get(`${process.env.REACT_APP_API_URL}/seat/${id}`, {headers: DEFAULT_HEADERS});
export const fetchHall = (id) => axios.get(`${process.env.REACT_APP_API_URL}/halls/${id}`, {headers: DEFAULT_HEADERS});
export const fetchSessions = (id) => axios.get(`${process.env.REACT_APP_API_URL}/sessions/${id}`, {headers: DEFAULT_HEADERS});
export const fetchGenres = () => axios.get(`${process.env.REACT_APP_API_URL}/genres`, {headers: DEFAULT_HEADERS});
export const fetchFormats = () => axios.get(`${process.env.REACT_APP_API_URL}/formats`, {headers: DEFAULT_HEADERS});
export const fetchLanguages = () => axios.get(`${process.env.REACT_APP_API_URL}/languages`, {headers: DEFAULT_HEADERS});
export const fetchHalls = () => axios.get(`${process.env.REACT_APP_API_URL}/halls`, {headers: DEFAULT_HEADERS});
export const createMovie = (params, authToken) => axios.post(`${process.env.REACT_APP_API_URL}/movies`, params,  {headers: AUTH_HEADERS(authToken)});
export const fetchAllMovie = () => axios.get(`${process.env.REACT_APP_API_URL}/movies`, {headers: DEFAULT_HEADERS});
export const fetchShowMovie = (id) => axios.get(`${process.env.REACT_APP_API_URL}/movies/${id}`, {headers: DEFAULT_HEADERS});
export const updateMovie = (id, params, authToken) => axios.put(`${process.env.REACT_APP_API_URL}/movies/${id}`, params,  {headers: AUTH_HEADERS(authToken)});
export const deleteMovie = (id, authToken) => axios.delete(`${process.env.REACT_APP_API_URL}/movies/${id}`,  {headers: AUTH_HEADERS(authToken)});


export const fetchUser = (id, authToken) => axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`,  {headers: AUTH_HEADERS(authToken)});
export const fetchCreateUser = (params) => axios.post(`${process.env.REACT_APP_API_URL}/register`, params );
export const fetchLoginUser = (params) => axios.post(`${process.env.REACT_APP_API_URL}/login`, params)
export const shelters = () => axios.get(`${process.env.REACT_APP_API_URL}/shelters`, {headers: DEFAULT_HEADERS});
