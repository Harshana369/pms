/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Box } from '@mui/material';

import MaterialTable from 'material-table';
import Page from '../components/Page';

export default function Material() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [data, setData] = useState();
  const [columns, setColumns] = useState();
  const [addNewRow, setAddNewRow] = useState();
  const [updateRow, setUpdateRow] = useState();
  const [objID, setObjId] = useState();
  const [tableData, setTableData] = useState();

  const getMateriyalColumnsAndData = async () => {
    await axiosInstance.get('/materialProjectsDatabases/getall').then((res) => {
      setObjId(res.data.success[0]._id);
      setColumns(res.data.success[0].headerproperties);
      setData(res.data.success[0].properties);
    });
  };

  // const addNewRowData = async () => {
  //   console.log('ok');

  //   await axiosInstance.post(`/materialProjectsDatabases/save/${objID}`, addNewRow).then((res) => {
  //     alert(res.status);
  //   });
  //   //   try {
  //   //     const res = await axios.post(
  //   //       `/materialProjectsDatabases/save/${objID}`,
  //   //       addNewRow
  //   //     );
  //   //   } catch (e) {
  //   //     alert(e);
  //   //   }
  // };

  useEffect(() => {
    getMateriyalColumnsAndData();
  }, []);
  return (
    <Page title="Mobitel Projects Databases | Projects Management Database">
      {/* <Typography variant="h6" gutterBottom>
        Mobitel Projects Databases
      </Typography> */}
      <Box>
        <MaterialTable
          title="Material Data"
          data={data}
          columns={columns}
          editable={{
            onRowAdd: async (newRow) =>
              new Promise((resolve, reject) => {
                axiosInstance
                  .post(`/materialProjectsDatabases/save/${objID}`, newRow)
                  .then((res) => {
                    getMateriyalColumnsAndData();
                  });
                setTimeout(() => resolve(), 500);
              }),
            onRowUpdate: async (newRow, oldRow) =>
              new Promise((resolve, reject) => {
                const data = newRow;
                axiosInstance
                  .put(`/materialProjectsDatabases/update/${objID}`, data)
                  .then((res) => {
                    getMateriyalColumnsAndData();
                  });
                setTimeout(() => resolve(), 500);
              }),

            onRowDelete: async (selectRow) =>
              new Promise((resolve, reject) => {
                const data = [`${selectRow._id}`];
                axiosInstance
                  .put(`/materialProjectsDatabases/delete/${objID}`, data)
                  .then((res) => {
                    getMateriyalColumnsAndData();
                  });

                setTimeout(() => resolve(), 500);
              })
          }}
          options={{
            filtering: true,
            addRowPosition: 'first',
            actionsColumnIndex: -1
          }}
        />
      </Box>
    </Page>
  );
}
