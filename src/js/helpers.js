// Función getJSON para obtener datos JSON de la API
import { TIMEOUT_SEC } from './config.js';

export async function getJSON(url) {
    try {
        const fetchPro = fetch(url);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
       // const { recipe } = data.data;
       // console.log(recipe);
        return data;
    } catch (error) {
        throw error;
    }
}


 const timeout = (s)=>{
    return new Promise(function (_, reject) {
    setTimeout(function () {
        reject(new Error(`¡La solicitud tomó demasiado tiempo! Expiró después de ${s} segundo(s).`));
      }, s * 1000);
    });
};
