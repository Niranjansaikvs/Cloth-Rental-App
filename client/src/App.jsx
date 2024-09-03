// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import UserLogin from "./components/UserLogin";
// import UserRegister from "./components/UserRegister";
// import "./App.css";
// import Home from "./components/Home";
// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AddProducts from "./components/AddProducts";
// import Cart from "./components/Cart";
// import { Suspense } from "react";
// import Loader from "./components/Loader";

// function App() {
//   return (
//     <>
//       <Router>
//         <Navbar />
//         <Suspense fallback={<Loader />}>
//           <Routes>
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/addProducts" element={<AddProducts />} />
//             <Route
//               path="/"
//               element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/login" element={<UserLogin />} />
//             <Route path="/register" element={<UserRegister />} />
//           </Routes>
//         </Suspense>
//       </Router>
//     </>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";

const Home = lazy(() => import("./components/Home"));
const UserLogin = lazy(() => import("./components/UserLogin"));
const UserRegister = lazy(() => import("./components/UserRegister"));
const AddProducts = lazy(() => import("./components/AddProducts"));
const Cart = lazy(() => import("./components/Cart"));
const Admin = lazy(() => import("./components/Admin"))

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Suspense fallback={<Loader />}>
          {/* <Route path="/loader" element={<Loader/>}/> */}
          <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addProducts"
              element={
                <ProtectedRoute>
                  <AddProducts />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
