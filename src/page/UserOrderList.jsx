import React, { useEffect } from 'react';

import { Head } from '../components/Head';
import { CompanyInfo } from '../components/Home/CompanyInfo';
import { CompanyHeader } from '../components/Home/CompanyHeader';
import { ChangeButton } from '../components/Home/changeButton';
import { OrderList } from '../components/Home/OrderList';
import { getAccessTokenV2, getUserInfo } from '../api/miniAppApi';

export const UserOrderList = () => {
  const [token, setToken] = React.useState(null);
  const [type, setType] = React.useState(1);
  //const [orderList, setOrderList] = React.useState([]);

  useEffect(() => {
    getAccessTokenV2().then((tk) => setToken(tk));
  }, []);
  useEffect(() => {
    if (token) getUserInfo(token).then((res) => console.log(res));
  }, [token]);
  return (
    <>
      <Head title="Home" description="hello" />
      <div className="flex-col text-center">
        <div className="inline self-center">
          <CompanyHeader />
        </div>
        <div>
          <ChangeButton type={type} setType={setType} />
        </div>
        <div>
          <OrderList />
        </div>
        <div>
          <CompanyInfo />
        </div>
      </div>
    </>
  );
};
