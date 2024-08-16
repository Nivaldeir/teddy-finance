import http from 'k6/http';
import { sleep, check } from 'k6';
export const options = {
  stages: [
    { duration: "10s", target: 10},
    { duration: "5s", target: 1000},
    { duration: "30s", target: 30},
],
};

export default function () {
  let res = http.get(`http://localhost:8080/shortened/link/LuK2WL`);
  check(res, {
    "status is 200": r=>r.status === 200,
    "status is 500": r=>r.status === 500,
  })
  sleep(1);
}
