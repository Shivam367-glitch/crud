import { customRequest } from "./ApiCall";
import {BASE_URL} from "./baseUrl"; 


export const registerUser= async(data,header)=>{
   return await customRequest("POST",`${BASE_URL}/api/user/register`,data,header);
}   

export const usersList= async(search,gender,status,sort,page)=>{
   return await customRequest("GET",`${BASE_URL}/api/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,{});
}


export const getSingleUser=async(id)=>{
   return await customRequest("GET",`${BASE_URL}/api/user/${id}`,{})
}


export const userDelete=async(id)=>{
   return await customRequest("DELETE",`${BASE_URL}/api/user/delete/${id}`,{});
}
export const UpdateUser=async(id,data,header)=>{
   return await customRequest("PUT",`${BASE_URL}/api/user/edit/${id}`,data,header)
}


export const statusChange=async(status,_id)=>{
   return await customRequest("PUT",`${BASE_URL}/api/user/status/${_id}`,{status})
}

export const exportToCsv = async()=>{
   return await customRequest("GET",`${BASE_URL}/api/user/exportCsv`,{});
}