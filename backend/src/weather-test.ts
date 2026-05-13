import { SingaporeWeatherClient } from './weather.js';

const client = new SingaporeWeatherClient({});

client
  .getCurrentWeather(1.296, 103.847)
  .then((snapshot) => {
    console.log('Success:', snapshot);
  })
  .catch((error: unknown) => {
    console.error('Error:', error);
    process.exitCode = 1;
  });
