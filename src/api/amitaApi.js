import axios from 'axios';
const server = 'https://amita-test-backend.herokuapp.com';
// const server = 'localhost:4000';
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
  return await axios
    .post(server + '/insertOrder', {
      date: date,
      hour: hour,
      status: type,
      checkoutId: checkoutId,
      userId: userId
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function insertUser(userID, firstname, lastname, phone, gmail) {
  return await axios
    .post(server + '/insertUser', {
      userID: userID,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      gmail: gmail
    })
    .then((res) => {
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
export async function updateEventID(id, end, start, checkoutId) {
  return await axios
    .post(server + '/updateEventID', {
      id: id,
      end: end,
      start: start,
      checkoutId: checkoutId
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getUserID(checkoutId) {
  return await axios
    .post(server + '/getUserID', {
      checkoutId: checkoutId
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
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function calendarList(start, end) {
  return await axios
    .post(server + '/getGoogleTime', {
      start: start,
      end: end
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
