// import { Logo } from "./components";
import {Landing, Register, Error} from "./pages";
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AddJob,AllJobs,Profile,Stats,ShareLayout} from './pages/Dashboard'
import ProtectedRoute from "./pages/ProtectedRoute";
// const Button = styled.button`
//   background: red;
//   color: white;
//   font-size: 2rem;
// `;

// const SecondButton = styled.button`
//   background: blue;
//   color: yellow;
//   font-size: 3rem;
// `;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <ShareLayout/>
          </ProtectedRoute>
        }>
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path="landing" element={<Landing/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  //  <div>
  //   <Landing/>
  //  </div>
  );
}

export default App;
