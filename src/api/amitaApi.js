import axios from 'axios';
const server = 'https://amita-backend.herokuapp.com';
export async function FetchData() {
  return await axios
    .get(server + '/get')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function FetchTimeRule() {
  return await axios
    .get(server + '/getTimeRule')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function FetchOrderList() {
  return await axios
    .get(server + '/getOrderList')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function insertOrder(date, hour, type, checkoutId, userId) {
  console.log(date, hour, type, checkoutId, userId);
  return await axios
    .post(server + '/insertOrder', {
      date: date,
      hour: hour,
      status: type,
      checkoutId: checkoutId,
      userId: userId
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function insertUser(userID, firstname, lastname, phone, gmail) {
  console.log(gmail);
  return await axios
    .post(server + '/insertUser', {
      userID: userID,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      gmail: gmail
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function findUser(userID) {
  return await axios
    .post(server + '/findUser', {
      userID: userID
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function findDate(date) {
  return await axios
    .post(server + '/findDate', {
      date: date
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function gerOrderUser(userId) {
  return await axios
    .post(server + '/getOrderUser', {
      userID: userId
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function updateOrder(payment, paid, checkoutId) {
  return await axios
    .post(server + '/updatePaymentId', {
      payment: payment,
      paid: paid,
      checkoutId: checkoutId
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function cancelOrder(date, hour) {
  return await axios
    .post(server + '/cancel', {
      date: date,
      hour: hour
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function calendarAdd(start, end, summary, description) {
  return await axios
    .post(server + '/addGoogleCalender', {
      start: start,
      end: end,
      summary: summary,
      description: description
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
