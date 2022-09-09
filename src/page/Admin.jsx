import React, { useEffect } from 'react';

import { Head } from '../components/Head';
import Navbar from '../components/sidebars/Navbar';
import { FetchOrderList } from '../api/amitaApi';
import 'react-calendar/dist/Calendar.css';
// import { Table } from 'antd';
//import { ButtonMain } from '../components/Buttons/Button';

//import { Link } from 'react-router-dom';
//import clsx from 'clsx';
// const columns = [
//   {
//     key: 'OrderID',
//     title: 'OrderID',
//     width: 60,
//     dataIndex: 'OrderID'
//   },
//   {
//     key: 'date',
//     title: 'date',
//     dataIndex: 'date'
//   },
//   {
//     key: 'status',
//     title: 'status',
//     dataIndex: 'status'
//   },
//   {
//     key: 'OrderDate',
//     title: 'OrderDate',
//     dataIndex: 'OrderDate'
//   },
//   {
//     key: 'userId',
//     title: 'userId',
//     dataIndex: 'userId'
//   }
// ];

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
      {/* <Table dataSource={orders} columns={columns} /> */}
      <div className="center p-5">
        <table className="table">
          <tr>
            <th>OrderID</th>
            <th>date</th>
            <th>hour</th>
            <th>status</th>
            <th>userId</th>
          </tr>
          <tbody>
            {orders?.map((data, i) => (
              <tr key={i}>
                <td>{data.orderID}</td>
                <td>{data.date}</td>
                <td>{data.hour}</td>
                <td>{data.status}</td>
                <td>{data.userID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
