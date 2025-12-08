import { ToastContainer } from 'react-toastify';
import './App.css';
import Blog from './Components/Blog';
import { Route, Routes } from 'react-router';
import Management from './Components/Management';
import Edit from './Components/Edit';
function App() {
  return (
    <>
      <Routes>
        <Route path='/manage-post' element={<Management />} />
        <Route path='/' element={<Blog />} />
        <Route path='/manage-post/edit/:id' element={<Edit />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
