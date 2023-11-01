// import React, { useEffect, useState } from 'react';
// import axiosInstance from './axios'; // Importa la instancia de Axios que creaste

// function MyComponent() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Realiza una solicitud GET
//     axiosInstance.get('/ruta-de-tu-api')
//       .then(response => {
//         setData(response.data);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }, []);

//   return (
//     <div>
//       {data.map(item => (
//         <div key={item.id}>{item.nombre}</div>
//       ))}
//     </div>
//   );
// }

// export default MyComponent;
