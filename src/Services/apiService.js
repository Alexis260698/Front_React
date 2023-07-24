import axios from 'axios'

export function consumingApi(base64) {
    const url = 'http://localhost:8081/api/labelAnnotations';

    const options = {
        method: 'POST',
        url: url,
        headers: {
            'content-type': 'application/json',
            'Accept': '/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        },
        data: { "base_64": base64 },
    };

    return axios.request(options)
        .then(function (response) {
            const {data} = response.data
            return data;           
        })
        .catch(function (error) {
            alert("Error al consultar la Api: " + error);
        })
        
       
    
}


export default consumingApi;