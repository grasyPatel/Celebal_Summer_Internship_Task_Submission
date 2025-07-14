import { BrowserRouter, Route,Routes} from "react-router-dom";
import UserLayout from "./componets/Layout/UserLayout";
import Home from "./pages/Home";
import {Toaster} from 'sonner';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage"
import ProductDetails from "./componets/Products/ProductDeatils";
import Checkout from "./componets/Cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmmation"
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import  AdminLayout from "./componets/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./componets/Admin/UserManagement";
import ProductManagement from "./componets/Admin/ProductManagement";
import EditProductPage from "./componets/Admin/EditProductPage";
import OrderManagement from "./componets/Admin/OrderManagement";

import {Provider} from "react-redux";
import store from "./redux/store";
 

function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
      <Toaster position="left-top"/>
       <Routes>
         <Route path="/" element={<UserLayout/>} >
         <Route index element={<Home/>} />
         <Route path="login" element={<Login/>} />
         <Route path="register" element={<Register/>} />
         <Route path="profile" element={<Profile/>} />
         <Route path="collections/:collection" element={<CollectionPage/>}/>
         <Route path="product/:id" element={<ProductDetails/>} />
         <Route path="checkout" element={<Checkout/>} />
         <Route path="order-confirmation" element={<OrderConfirmation/>} />
         <Route path="order/:id" element={<OrderDetailsPage/>} />
         <Route path="/my-orders" element={<MyOrdersPage/>}/>
        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<AdminHomePage/>} />
          <Route path="users" element={<UserManagement/>} />
          <Route path="orders" element={<OrderManagement/>}/>
          <Route path="products" element={<ProductManagement/>} />
          <Route path="products/:id/edit" element={<EditProductPage/>} />
         

        </Route>

       </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
