import axios from 'axios';
//import { apiClient } from './apiClient';
export const stsBase = 'https://test.hipay.mn:4441/';
export async function FetchQuestionType() {
  return await axios
    .get(stsBase + `survey/open`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function FetchQuestions(data) {
  return await axios
    .get(stsBase + `survey/open/getQuestions?surveyId=${data}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function saveResult(data) {
  return await axios
    .post(stsBase + `survey/open/surveyResult`, data, {
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
