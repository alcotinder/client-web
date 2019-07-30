import io from 'socket.io-client';

const url = 'https://localhost:8443';

const connect = accessToken => {
  const socket = io.connect(url, {
    query: {
      authorization: `Bearer ${accessToken}`
    },
  });
  return socket;
};

export default connect;