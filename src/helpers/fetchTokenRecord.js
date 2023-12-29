import axios from 'axios';

async function fetchTokenRecord(token) {
  try {
    const response = await axios.post('https://us-central1-questmap-mubas.cloudfunctions.net/getTokenRecord', {
      token: token
    });
    console.log('here is token',response);
    return response.data;
  } catch (error) {
    console.error('There was a problem with the Axios operation:', error);
  }
}

export { fetchTokenRecord };
