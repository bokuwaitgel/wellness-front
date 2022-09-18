import React, { useEffect } from 'react';

import { Head } from '../components/Head';
import Navbar from '../components/sidebars/Navbar';
import { FetchOrderList } from '../api/amitaApi';
import { DayCont } from '../components/Home/time/DayCont';
import AdminTable from '../components/Admin/AdminTable';
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
  const [day, setDay] = React.useState(new Date());
  useEffect(() => {
    if (orders?.length === 0)
      FetchOrderList().then((res) => {
        setOrders(res.filter((d) => d.status === 'order'));
      });
  }, []);
  const [filtered, setFiltered] = React.useState([]);
  useEffect(() => {
    console.log('sdfdsf');
    setFiltered(orders?.filter((d) => d.date === day.getMonth() + 1 + '/' + day.getDate()));
    console.log(filtered);
  }, [day, orders]);
  console.log(filtered);
  return (
    <>
      <Head title="Admin" description="hello" />
      <Navbar />
      <DayCont day={day} onChange={setDay} check={false} />
      {/* <Table dataSource={orders} columns={columns} /> */}
      <AdminTable orderList={filtered} />
      <div className="center p-5">
        <table className="table">
          <tr>
            <th>OrderID</th>
            <th>date</th>
            <th>hour</th>
            <th>status</th>
            <th>userId</th>
            <th>orderDate</th>
          </tr>
          <tbody>
            {filtered?.map((data, i) => (
              <tr key={i}>
                <td>{data.orderID}</td>
                <td>{data.date}</td>
                <td>{data.hour}</td>
                <td>{data.status}</td>
                <td>{data.userID}</td>
                <td>{data.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Tables orderList={data} /> */}
      </div>
    </>
  );
};
