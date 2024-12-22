// src/lib/client.ts
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://57.128.191.15:3000/api', // Updated to match the server IP and port
});
