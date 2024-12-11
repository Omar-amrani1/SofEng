
// stress/k6Test.js

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp-up to 10 users over 30 seconds
    { duration: '1m', target: 50 }, // Hold at 50 users for 1 minute
    { duration: '10s', target: 0 }, // Ramp-down to 0 users
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3000'; // Adjust to your running server

  // Example endpoints to test
  const endpoints = [
    '/home',
    '/property-details',
    '/register',
  ];

  // Randomly select an endpoint to test
  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];

  // Make a GET request
  http.get(`${BASE_URL}${endpoint}`);

  // Simulate user think time
  sleep(Math.random() * 2);
}
