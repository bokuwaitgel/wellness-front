import React, { useEffect } from 'react';

import { Head } from '../components/Head';
import {
  getUserID,
  updateOrder,
  FetchTimeRule,
  findUser,
  calendarAdd,
  updateEventID
} from '../api/amitaApi';

// if (res) {
//     findUser(userId).then((result) => {
//       const start = new Date(day.getFullYear(), day.getMonth(), day.getDate());
//       const end = new Date(day.getFullYear(), day.getMonth(), day.getDate());
//       const hm = time?.split(':');
//       const dl = delay?.split(':');
//       start.setHours(parseInt(hm[0]));
//       end.setHours(parseInt(hm[0]) + parseInt(dl[0]));
//       start.setMinutes(parseInt(hm[1]));
//       end.setMinutes(parseInt(dl[1]) + parseInt(hm[1]));
//       calendarAdd(
//         start,
//         end,
//         result[0].firstname + ' ' + result[0].phone,
//         'phone: ' + result[0].phone + (result[0].gmail ? '\ngmail: ' + result[0].gmail : '')
//       ).then((data) => {
//         console.log(data);
//         updateEventID(
//           data?.data.data.id,
//           data?.data.data.end.dateTime,
//           data?.data.data.start.dateTime,
//           checkoutId
//         );
//       });
//     });

// getCheckoutInfo(d.checkoutId).then((re) => {
//     if (re.status === 'paid') {
//       updateOrder(re.paymentId, re.status, d.checkoutId);
//       const start = new Date(d.startTime);
//       const end = new Date(d.endTime);
//       start.setHours(parseInt(start.getHours()) - 8);
//       end.setHours(parseInt(end.getHours()) - 8);
//       if (d.eventID && d.startTime && d.endTime) {
//         calendarUpdate(
//           d.eventID,
//           start,
//           end,
//           result[0].firstname + ' ' + result[0].phone,
//           'phone: ' +
//             result[0].phone +
//             (result[0].gmail ? '\ngmail: ' + result[0].gmail : '') +
//             '\nPaid'
//         ).then((res) => console.log(res));
//       }
//     }
//   });

export const Access = () => {
  var query = window.location.search.substring(1).split('&');
  const checkoutId = query[1]?.split('=') || '';
  const description = query[2]?.split('=') || '';
  const paymentId = query[3]?.split('=') || '';
  const [res, setres] = React.useState('null');
  useEffect(() => {
    getUserID(checkoutId[1]).then((res) => {
      if (res && description[1] === 'SUCCESS') {
        updateOrder(paymentId[1], 'paid', checkoutId[1]);
        const day = res.date.split('/');
        const start = new Date();
        start.setFullYear(parseInt(day[0]));
        start.setMonth(parseInt(day[1]) - 1);
        start.setDate(parseInt(day[2]));
        const end = new Date();
        end.setFullYear(parseInt(day[0]));
        end.setMonth(parseInt(day[1]) - 1);
        end.setDate(parseInt(day[2]));
        setres(start);
        const hm = res.hour?.split(':');
        FetchTimeRule().then((time) => {
          const delay = time[0]?.delay;
          const dl = delay?.split(':');
          start.setHours(parseInt(hm[0]));
          end.setHours(parseInt(hm[0]) + parseInt(dl[0]));
          start.setMinutes(parseInt(hm[1]));
          end.setMinutes(parseInt(dl[1]) + parseInt(hm[1]));
          findUser(res.userID).then((result) => {
            calendarAdd(
              start,
              end,
              result[0].firstname + ' ' + result[0].phone,
              'phone: ' + result[0].phone + (result[0].gmail ? '\ngmail: ' + result[0].gmail : '')
            ).then((data) => {
              setres(data);
              updateEventID(
                data?.data.data.id,
                data?.data.data.end.dateTime,
                data?.data.data.start.dateTime,
                checkoutId[1]
              );
            });
          });
        });
      }
    });
    console.log('tet');
  }, []);
  return (
    <>
      <Head title="Access" description="hello" />
      {JSON.stringify(query)}
      {JSON.stringify(checkoutId)}
      {JSON.stringify(description)}
      {JSON.stringify(paymentId)}
      {JSON.stringify(res)}
    </>
  );
};
