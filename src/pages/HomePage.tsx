import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Добро пожаловать на платформу голосования</h1>
      <div className="home-buttons">
        <button onClick={() => navigate('/polls')}>Список голосований</button>
        <button onClick={() => navigate('/create')}>Создать новый опрос</button>
      </div>
    </div>
  );
};

export default HomePage;
