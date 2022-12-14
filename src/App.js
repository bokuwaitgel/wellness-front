import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './page/Home';
import { Access } from './page/Access';
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
          <Route path="/access" element={<Access />} />
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
