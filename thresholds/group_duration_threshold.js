import http from "k6/http";
import { group, sleep } from "k6";
import { Trend } from "k6/metrics";

let groupDuration = Trend('groupDuration');

export let options = {
    thresholds: {
        'groupDuration{groupName:individualRequests}': ['avg < 200'],
        'groupDuration{groupName:batchRequests}': ['avg < 200'],
    },
    vus: 1,
    duration: '10s',
};

function groupWithDurationMetric(name, group_function) {
    let start = new Date();
    group(name, group_function);
    let end = new Date();
    groupDuration.add(end - start, { groupName: name });
}

export default function () {
    groupWithDurationMetric('individualrequests', function () {
        http.get('https://test-api.k6.io/public/crocodiles/1/');
        http.get('https://test-api.k6.io/public/crocodiles/2/');
        http.get('https://test-api.k6.io/public/crocodiles/3/');
    });

    groupWithDurationMetric ('batchRequests', function () {
        http.batch([
            ['GET', 'https://test-api.k6.io/public/crocodiles/1/'],
            ['GET', 'https://test-api.k6.io/public/crocodiles/2/'],
            ['GET', 'https://test-api.k6.io/public/crocodiles/3/'],
        ]);
    });

    sleep(1);
}