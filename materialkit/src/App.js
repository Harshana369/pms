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

  const mobitelProjectBlackup = async () => {
    try {
      await axiosInstance.get('/api/blackup/mobitelprojectdatabase/json');
    } catch (err) {
      console.error(err);
    }
  };

  const venderProjectBlackup = async () => {
    try {
      await axiosInstance.get('/api/blackup/venderprojectdatabase/json');
    } catch (err) {
      console.error(err);
    }
  };

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

  useEffect(() => {
    console.log('hars-m');
    const interval = setInterval(() => {
      console.log('mobitel');
      mobitelProjectBlackup();
    }, 86400000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log('hars-v');
    const interval = setInterval(() => {
      console.log('vender');
      venderProjectBlackup();
    }, 86400000);

    return () => clearInterval(interval);
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
