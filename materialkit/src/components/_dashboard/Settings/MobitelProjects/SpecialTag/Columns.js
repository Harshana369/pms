import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { parseISO } from 'date-fns';
import clsx from 'clsx';
import moment from 'moment';
/* eslint-disable camelcase */

export const Columns = [
  {
    field: '_id',
    headerName: 'ID',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 250,
    cellClassName: () => clsx('super-app-theme--cell'),
    editable: true,
    hide: true
  },
  {
    field: 'Special_Tag',
    headerName: 'Special Tag',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 430,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  }
];
