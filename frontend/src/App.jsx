import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './redux/auth-slice';
import { closeSearchModal } from './redux/modal-slice';
import './index.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import About from './components/About';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import SearchModal from './components/SearchModal';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import EditRecipe from './components/EditRecipe';
import RecipeDetail from './components/RecipeDetail';
import Footer from './components/Footer'; // Import the Footer

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const showSearchModal = useSelector((state) => state.modal.showSearchModal);

  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/recipes" element={<Recipes />} />
            {isAuthenticated && <Route path="/add-recipe" element={<AddRecipe />} />}
            {isAuthenticated && <Route path="/profile" element={<Profile />} />}
          </Routes>
        </main>

        {/* Search Modal */}
        {showSearchModal && <SearchModal onClose={() => dispatch(closeSearchModal())} />}

        <Footer /> {/* Add the Footer here */}
      </div>
    </Router>
  );
};

export default App;
