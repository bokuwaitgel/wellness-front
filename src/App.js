import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './page/Home';
import { Admin } from './page/Admin';
import { DayCancel } from './page/DayCancel';
import { HelmetProvider } from 'react-helmet-async';
// const Hello = () => null;
import './App.css';
import './index.css';
import { NotFound } from './components/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Routes>
          {/*<Route path="/" element={<App />}>*/}
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/day" element={<DayCancel />} />
          <Route path="/list" element={<DayCancel />} />
          <Route path="*" element={<NotFound />} />
          {/*</Route>*/}
        </Routes>
      </HelmetProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
