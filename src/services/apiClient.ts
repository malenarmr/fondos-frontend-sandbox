import axios from 'axios';

const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://provincia-prod-api.teocoop.site/api',
  // 'https://provincia-sandbox-api.teocoop.site/api',

  headers: { 'Content-Type': 'application/json' },
});

export default apiClient;
