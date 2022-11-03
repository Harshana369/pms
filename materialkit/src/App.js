import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// ------------------------------------------------------------------------

export default function App() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [privateData, setPrivateData] = useState('');

  useEffect((e) => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth')}`
        }
      };

      try {
        const { data } = await axiosInstance.get('/api/private', config);
        setPrivateData(data.data);
      } catch (error) {
        window.stop('/');
        localStorage.removeItem('auth');
        window.stop();
        navigate('/login', { replace: true });
        setError('You are not authorized please login');
      }
    };

    fetchPrivateDate();
  }, []);

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
