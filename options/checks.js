import { check } from "k6";
import http from "k6/http";

export let options = {
    logOutput: 'stdout',
    logFormat: 'json',
    httpDebug: 'full'
}

export default function () {
    let res = http.get('http://test.k6.io');
    check(res, {
        //A failed check will not fail the whole load test
        'is status 200': (r) => r.status === 200,
        'body size is 1176 bytes': (r) => r.body.length == 1176,
    });
}