import { Route, Routes } from "react-router-dom";
import MovieSearch from "./MovieFind";
import Auth from "./Auth";
import PNF from "./PNF.jsx";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <MovieSearch />}/>
        <Route path="/login" element={<Auth />}/>
        <Route path="/register" element={<Auth insideRegiter={true}/>}/>
        <Route path="/*" element={<PNF/>}/>
      </Routes>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
    </>
  );
}

export default App;
