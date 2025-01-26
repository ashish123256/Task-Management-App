import {BrowserRouter, Routes, Route} from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import TaskManagement from "./pages/TaskManagement";
import Feed from "./pages/Feed";


function App() {
  

  return (
   
    <BrowserRouter>
    <Header/>
     <Routes>
     
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route element={<PrivateRoute/>}>
       <Route path="/profile" element={<Profile/>}/>  
       <Route path="/" element={<TaskManagement/>} />
       <Route path="/user-feed" element={<Feed/>}/>  
      </Route>
     </Routes>
    </BrowserRouter>
      
   
  )
}

export default App
