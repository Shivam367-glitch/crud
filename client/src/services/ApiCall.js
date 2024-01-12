import axios from "axios";

export const customRequest = async (method, url, body, header) => {
  
    try {
        const config = {
            method,
            url,
            headers: header || {
                "Content-Type": "application/json"
            },
            data: header ?body: JSON.stringify(body)  
        };

        const response = await axios(config);
        return response; 
    } catch (error) {
       console.log(error);
        return error;
    }
};
