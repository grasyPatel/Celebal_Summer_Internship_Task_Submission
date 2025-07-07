import { BrowserRouter, Route,Routes} from "react-router-dom";
import UserLayout from "./componets/Layout/UserLayout";


function App() {

  return (
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<UserLayout/>} >
         
         </Route>

       </Routes>
    </BrowserRouter>
  )
}

export default App
