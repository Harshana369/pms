import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AllMobitelHandoverData() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const [dropdownValue, setDropdownValue] = useState('All Mobitel Projects');
  const [DetailsDataInScope, setDetailsDataInScope] = React.useState({});
  const fetchScopeData = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsDatabases', {
        params: { ProjectName: dropdownValue }
      })
      .then((res) => {
        // setHandoverData(res.data.HandOverDataToSquares);
        console.log(res.data.HandOverDataToSquares);
      });
  };

  useEffect(() => {
    fetchScopeData();
  }, []);

  return (
    <div>
      <h1>I'm HandOver</h1>
    </div>
  );
}

export default AllMobitelHandoverData;
