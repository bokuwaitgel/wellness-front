import React, { useEffect } from 'react';

import { Head } from '../components/Head';
import Navbar from '../components/sidebars/Navbar';
import { FetchOrderList } from '../api/amitaApi';
import 'react-calendar/dist/Calendar.css';
import { Table, Card } from 'antd';
//import { ButtonMain } from '../components/Buttons/Button';

//import { Link } from 'react-router-dom';
//import clsx from 'clsx';
const columns = [
  {
    key: 'OrderID',
    title: 'OrderID',
    width: 60,
    dataIndex: 'OrderID'
  },
  {
    key: 'date',
    title: 'date',
    dataIndex: 'date',
    render: (text) => {
      console.log(text);
    }
  },
  {
    key: 'status',
    title: 'status',
    dataIndex: 'status'
  },
  {
    key: 'OrderDate',
    title: 'OrderDate',
    dataIndex: 'OrderDate',
    render: (text) => {
      console.log(text);
    }
  },
  {
    key: 'userId',
    title: 'userId',
    dataIndex: 'userId'
  }
];

export const Admin = () => {
  const [orders, setOrders] = React.useState([]);
  useEffect(() => {
    if (orders?.length === 0)
      FetchOrderList().then((res) => {
        setOrders(res);
      });
  }, []);
  console.log(orders);
  return (
    <>
      <Head title="Admin" description="hello" />
      <Navbar />
      <Card className="center mt-2" title="orders">
        <Table dataSource={orders} columns={columns} />
      </Card>
    </>
  );
};
