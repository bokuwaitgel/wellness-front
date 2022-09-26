import { apiClient } from './apiClient';

export const stsBase = 'https://test.hipay.mn';
export async function getAccessToken() {
  console.log({
    client_id: 'amita001',
    client_secret: 'Trk4UNHt58LqDwRL4adsXV',
    redirect_uri: 'xcvx',
    code: 'E8655E60BE7F5627E0532A65A8C0C391',
    grant_type: 'authorization_code'
  });
  fetch('https://test.hipay.mn/v2/auth/token', {
    method: 'post',
    data: {
      // eslint-disable-next-line prettier/prettier
      client_id: 'amita001',
      client_secret: 'Trk4UNHt58LqDwRL4adsXV',
      redirect_uri: 'xcvx',
      code: 'E839285840B26E1EE0532A65A8C0FE6A',
      grant_type: 'authorization_code'
    }
  })
    .then((res) => res.json())
    .then((pdata) => {
      console.log(pdata);
      return pdata;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getAccessTokenV2(code) {
  return await apiClient
    .post('/v2/auth/token', {
      client_id: 'amita001',
      client_secret: 'Trk4UNHt58LqDwRL4adsXV',
      redirect_uri: 'https://amita-front.herokuapp.com/access/',
      code: code,
      grant_type: 'authorization_code'
    })
    .then((res) => {
      if (res?.data.code === 1) {
        return res?.data.access_token;
      } else {
        return '';
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getUserInfo(token) {
  const bearer = 'Bearer ' + token;
  return await apiClient
    .get('/v2/user/info', {
      headers: {
        Authorization: bearer
      }
    })
    .then((res) => {
      if (res?.data.code === 1) {
        return res?.data;
      } else {
        return {};
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function checkout() {
  const bearer = 'Bearer Trk4UNHt58LqDwRL4adsXV';
  return await apiClient
    .post(
      '/checkout/',
      {
        entityId: 'amita001',
        amount: '5000',
        currency: 'MNT'
      },
      {
        headers: {
          Authorization: bearer
        }
      }
    )
    .then((res) => {
      if (res?.data.code === 1) {
        return res.data;
      } else {
        return {};
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getCheckoutInfo(checkoutId) {
  const bearer = 'Bearer Trk4UNHt58LqDwRL4adsXV';
  return await apiClient
    .get(`/checkout/get/${checkoutId}`, {
      headers: {
        Authorization: bearer
      }
    })
    .then((res) => {
      if (res?.data.code === 1) {
        return res.data;
      } else {
        return {};
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function getPayment(payment) {
  const bearer = 'Bearer Trk4UNHt58LqDwRL4adsXV';
  return await apiClient
    .get(`/payment/get/${payment}?entityId=amita001`, {
      headers: {
        Authorization: bearer
      }
    })
    .then((res) => {
      console.log(res.data);
      if (res?.data.code === 1) {
        return res;
      } else {
        return {};
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
