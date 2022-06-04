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

export const announcementDone = (id,authToken) => axios.put(`${process.env.REACT_APP_API_URL}/announcements/done/${id}`,{} ,{headers: AUTH_HEADERS(authToken)});
export const fetchAnimal = (id) => axios.get(`${process.env.REACT_APP_API_URL}/animalOne/${id}`,);
export const updateAnimal = (id, params, authToken) => axios.put(`${process.env.REACT_APP_API_URL}/animal/${id}`, params,  {headers: AUTH_HEADERS(authToken)});
export const fetchShelter = (id) => axios.get(`${process.env.REACT_APP_API_URL}/shelter/${id}`);
export const updateShelter = (id, params, authToken) => axios.put(`${process.env.REACT_APP_API_URL}/shelter/${id}`, params,  {headers: AUTH_HEADERS(authToken)});
export const createAnnouncement = (params, authToken) => axios.post(`${process.env.REACT_APP_API_URL}/announcements`, params,  {headers: AUTH_HEADERS(authToken)});
export const fetchAnnouncements = () => axios.get(`${process.env.REACT_APP_API_URL}/announcements`, {headers: DEFAULT_HEADERS});
export const updateUser = (id, params, authToken) => axios.put(`${process.env.REACT_APP_API_URL}/user/${id}`, params,  {headers: AUTH_HEADERS(authToken)});
export const createAnimal = (params, authToken) => axios.post(`${process.env.REACT_APP_API_URL}/animal`, params,  {headers: AUTH_HEADERS(authToken)});
export const createShelter = (params, authToken) => axios.post(`${process.env.REACT_APP_API_URL}/shelter`, params,  {headers: AUTH_HEADERS(authToken)});
export const fetchUser = (id, authToken) => axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`,  {headers: AUTH_HEADERS(authToken)});
export const fetchCreateUser = (params) => axios.post(`${process.env.REACT_APP_API_URL}/register`, params );
export const fetchLoginUser = (params) => axios.post(`${process.env.REACT_APP_API_URL}/login`, params)
export const shelters = () => axios.get(`${process.env.REACT_APP_API_URL}/shelter`, {headers: DEFAULT_HEADERS});

export const archiveAnimal = (id, authToken) => axios.put(`${process.env.REACT_APP_API_URL}/animal/archive/${id}`, {} ,{headers: AUTH_HEADERS(authToken)});
export const bookAnimal = (id, data, authToken) => axios.put(`${process.env.REACT_APP_API_URL}/animal/booked/${id}`, {data},{headers: AUTH_HEADERS(authToken)});
export const unbookAnimal = (id) => axios.put(`${process.env.REACT_APP_API_URL}/animal/unbooked/${id}`);

export const animals = (id) => axios.get(`${process.env.REACT_APP_API_URL}/animal/${id}`);
export const fetchAllAnnouncement = () => axios.get(`${process.env.REACT_APP_API_URL}/announcements/all`, {headers: DEFAULT_HEADERS});
export const fetchAllAnimals = () => axios.get(`${process.env.REACT_APP_API_URL}/animals/all`, {headers: DEFAULT_HEADERS});

export const allAnimal = () => axios.get(`${process.env.REACT_APP_API_URL}/animal`);

export const allAnimalsCount = () => axios.get(`${process.env.REACT_APP_API_URL}/analytics/allAnimalsCount`, {headers: DEFAULT_HEADERS});
export const allShelterCount = () => axios.get(`${process.env.REACT_APP_API_URL}/analytics/allShelterCount`, {headers: DEFAULT_HEADERS});
export const fetchAnnouncement = (id) => axios.get(`${process.env.REACT_APP_API_URL}/announcements/${id}`, {headers: DEFAULT_HEADERS});

