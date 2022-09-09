import axios from 'axios';

export async function FetchData() {
  return await axios
    .get('http://localhost:8000/get')
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function FetchTimeRule() {
  return await axios
    .get('http://localhost:8000/getTimeRule')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function FetchOrderList() {
  return await axios
    .get('http://localhost:8000/getOrderList')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function insertOrder(date, hour) {
  return await axios
    .post('http://localhost:8000/insertOrder', {
      date: date,
      hour: hour
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function findDate(date) {
  return await axios
    .post('http://localhost:8000/findDate', {
      date: date
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
