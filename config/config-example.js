import http from 'k6/http';

//k6 run --config config.json config-example.js replaces the options variable

export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1/');
}