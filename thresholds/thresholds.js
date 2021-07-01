import http from 'k6/http';

export let options = {
    thresholds: {
        http_req_failed: ['rate<0.01'], //http errors should be less than 1%
        http_req_duration: ['p(90)<400', 'p(95) < 800', 'p(99.9) < 2000'], //90% of requests finish within 400ms, 95% within 800ms, 99.9% within 2s
    },
};

export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1/');
}