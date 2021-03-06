import http from "k6/http";
import { Trend, Rate, Counter, Gauge } from "k6/metrics";
import { sleep } from "k6";

export let TrendRTT = new Trend('RTT');
export let RateContentOK = new Rate('Content OK');
export let GaugeContentSize = new Gauge('ContentSize');
export let CounterErrors = new Counter('Errors');
export let options = {
    thresholds: {
        RTT: ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
        'Content OK': ['rate>0.95'],
        ContentSize: ['value<4000'],
        Errors: ['count<100'],
    },
    vus: 1,
    duration: '5s'
};

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
    let contentOK = res.json('name') === 'Bert';

    TrendRTT.add(res.timings.duration);
    RateContentOK.add(contentOK);
    GaugeContentSize.add(res.body.length);
    CounterErrors.add(!contentOK);

    sleep(1);

}