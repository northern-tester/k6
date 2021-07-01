import http from "k6/http";

export let options = {
    vus: 30,
    duration: '2m',
    thresholds: {
        http_req_duration: [{threshold: 'p(99) < 10', abortOnFail: true}]
    },
};

export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1/');
}