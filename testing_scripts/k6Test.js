
// stress/k6Test.js

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 }, 
    { duration: '1m', target: 50 }, 
    { duration: '10s', target: 0 }, 
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3000'; 

  const endpoints = [
    '/home',
    '/property-details',
    '/register',
  ];
  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  http.get(`${BASE_URL}${endpoint}`);
  sleep(Math.random() * 2);
}
