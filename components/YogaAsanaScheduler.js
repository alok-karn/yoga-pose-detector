// "use-client";
// import React, { useState } from "react";
// import Calendar from "react-calendar";
// // import "react-calendar/dist/Calendar.css";

// const YogaAsanaScheduler = () => {
//     const [date, setDate] = useState(new Date());
//     const [asanaName, setAsanaName] = useState("");
//     const [scheduledAsanas, setScheduledAsanas] = useState([]);

//     const handleDateChange = (newDate) => {
//         setDate(newDate);
//     };

//     const handleAsanaNameChange = (event) => {
//         setAsanaName(event.target.value);
//     };

//     const handleScheduleAsana = () => {
//         if (asanaName.trim() === "") {
//             alert("Please enter a valid asana name");
//             return;
//         }

//         const asana = {
//             date: date.toDateString(),
//             name: asanaName.trim(),
//         };
//         setScheduledAsanas([...scheduledAsanas, asana]);
//         setAsanaName("");
//     };

//     console.log(scheduledAsanas);

//     return (
//         <div>
//             <h2>Schedule an Exercise</h2>
//             <div>
//                 <label>Select Date:</label>
//                 <Calendar onChange={handleDateChange} value={date} />
//             </div>
//             <div>
//                 <label>Asana Name:</label>
//                 <input
//                     type="text"
//                     placeholder="Enter Asana Name"
//                     value={asanaName}
//                     onChange={handleAsanaNameChange}
//                 />
//             </div>
//             <button onChange={handleScheduleAsana}>Schedule Asana</button>
//             {/* <h3>Scheduled Yoga Asanas</h3>
//             <ul>
//                 {scheduledAsanas.map((asana, index) => (
//                     <li key={index}>
//                         <strong>{asana.date}</strong>: <em>{asana.name}</em>
//                         <p>{asana.description}</p>
//                     </li>
//                 ))}
//             </ul> */}
//         </div>
//     );
// };

// export default YogaAsanaScheduler;
