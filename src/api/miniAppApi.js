import { apiClient } from './apiClient';

export const stsBase = 'https://test.hipay.mn';

export async function getAccessTokenV2(code) {
  return await apiClient
    .post('/v2/auth/token', {
      client_id: 'amita001',
      client_secret: 'Trk4UNHt58LqDwRL4adsXV',
      redirect_uri: 'https://amita-backend.herokuapp.com/webhook',
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
        currency: 'MNT',
        redirect_uri: 'https://amita-backend.herokuapp.com/webhook'
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
