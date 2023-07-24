import React, { useState } from "react";
import { consumingApi } from "../Services/apiService";


function ImageBlob() {
    const [imgs, setImgs] = useState();
    const [apiData, setApiData] = useState();

    const apiCall = async () => {
        try {
            if (imgs === undefined) {
                alert("Primero debes seleccionar una imagen");
                return;
            }

            const base64 = imgs.split(',')[1];

            const response = await consumingApi(base64);

            setApiData(response);


        } catch (error) {
            alert("error: " + error);
        }

    }

    const handleChnage = (e) => {
        try {
            console.log(e.target.files)
            const data = new FileReader()
            data.addEventListener('load', () => {
                setImgs(data.result)
            })
            data.readAsDataURL(e.target.files[0])
        } catch (error) {
            alert("Error al obtener imagen")
        }
    }



    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                <input type='file' accept="image/png, image/jpeg" onChange={handleChnage} />
                </div>
                <div className="col-sm">
                <button className="btn btn-primary" onClick={apiCall}  >Consultar Api</button>
                </div>
            </div>
            <img src={imgs} className="img-thumbnail" height="400px" width="400px" />
            <div>
                <ul className="list-group">
                    {apiData? "Objetos con mayor probabilidad encontrados" : ""}
                    
                    {apiData?.map((info, i) => (<li className="list-group-item" key={info}>{info.description} : <strong> {info.score}</strong> </li>))}
                </ul>
            </div>
        </div>
    )
}
export default ImageBlob;