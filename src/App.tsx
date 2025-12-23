import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrderFormPage from './pages/OrderFormPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/commande-site" element={<OrderFormPage />} />
        <Route path="/commande-confirmee" element={<ConfirmationPage />} />
      </Routes>
    </div>
  );
}

export default App;
