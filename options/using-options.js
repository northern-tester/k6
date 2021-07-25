import http from 'k6/http';

export let options = {
    hosts: {'test.k6.io': '1.2.3.4'},
    stages: [
        { duration: '1m', target: 10 },
        { duration: '1m', target: 20 },
        { duration: '1m', target: 0 },
    ],
    thresholds: { http_req_duration: ['avg<100', 'p(95)<200'] },
    noConnectionReuse: true,
    userAgent: 'MyK6UserAgentString/1.0',
    httpDebug: 'full'
};

/* This will override the options above:

k6 run --no-connection-reuse --user-agent "MyK7UserAgentString/1.0" using-options.js

*/

export default function () {
    http.get('http://test.k6.io');
}