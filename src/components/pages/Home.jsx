// import { useState, useEffect } from 'react';
// import fieldService from '../services/field/field.service';

// const getData = async () => {
//   const response = await fieldService();
//   return response;
// };

// function Home() {
//   const [filed, setField] = useState({});

//   useEffect(async () => {
//     const response = await getData();
//     setField(response);
//   }, []);

//   return (
//     <div className='home'>
//       <div>
//         <select value={selectedMode} onChange={handleCurrentMode}>
//           {field ? (
//             Object.keys(field).map((item) => (
//               <option key={item} value={item}>
//                 {item}
//               </option>
//             ))
//           ) : (
//             <option value='normalMode'>Loading</option>
//           )}
//         </select>
//         <button type='button' onClick={clickChangeMode}>
//           start
//         </button>
//       </div>
//     </div>
//   );
// }
