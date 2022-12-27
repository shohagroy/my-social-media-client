// import axios from "axios";
// import React, { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { useNavigate } from "react-router-dom";
// import { AuthContex } from "../GobalAuthProvaider/GobalAuthProvaider";

// export const FunctionContext = createContext();

// const UtilityFunction = ({ children }) => {
//   const [newPost, setNewPost] = useState({});
//   const { user } = createContext(AuthContex);
//   const date = new Date().toLocaleString();
//   // create user post
//   const CreateNewPost = (text, image) => {
//     return console.log("asdkfjlkjsadhflkashflkjsdahfokjhsadfj");
//     console.log(text, image);
//     const navigation = useNavigate();
//     const newPost = {
//       user: user.email,
//       text,
//       image,
//       date,
//       react: [
//         { like: "", user: [] },
//         { love: "", user: [] },
//         { haha: "", user: [] },
//       ],
//       totalReact: 0,
//       allComment: [{ comment: "", userEmail: "", date }],
//     };
//     console.log("component call");
//     return fetch(
//       `http://localhost:5000/createNewPost?userEmail=${user?.email}`,
//       {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//           authorization: `Bearer ${localStorage.getItem("weShare")}`,
//         },
//         body: JSON.stringify(newPost),
//       }
//     );
//   };

//   const value = { CreateNewPost, setNewPost };
//   return (
//     <FunctionContext.Provider value={value}>
//       {children}
//     </FunctionContext.Provider>
//   );
// };

// export default UtilityFunction;
