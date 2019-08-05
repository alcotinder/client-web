import io from 'socket.io-client';

const url = 'https://alcotinder.herokuapp.com';

const connect = accessToken => {
  const socket = io.connect(url, {
    query: {
      authorization: `Bearer ${accessToken}`
    },
  });
  return socket;
};

export default connect;