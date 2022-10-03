import { apiClient } from './apiClient';

export const stsBase = 'https://sts.hipay.mn';
export const client_secret = '5hPR4fs9g2Wq5ZAXWI0L2L';
export const client_id = 'amitawlc';

export async function getAccessTokenV2(code) {
  return await apiClient
    .post('/v2/auth/token', {
      client_id: client_id,
      client_secret: client_secret,
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
  const bearer = 'Bearer ' + client_secret;
  return await apiClient
    .post(
      '/checkout',
      {
        entityId: client_id,
        amount: '5000',
        currency: 'MNT',
        redirect_uri: 'https://amita-front.herokuapp.com/access'
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
  const bearer = 'Bearer ' + client_secret;
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
  const bearer = 'Bearer ' + client_secret;
  return await apiClient
    .get(`/payment/get/${payment}?entityId=amita001`, {
      headers: {
        Authorization: bearer
      }
    })
    .then((res) => {
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
