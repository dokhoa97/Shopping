import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProductsPage from './pages/ProductsPage';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/product' element={<ProductsPage />} />
      </Routes>
    </>
  );
}

export default App;
