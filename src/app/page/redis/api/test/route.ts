import { Redis } from "ioredis";
import _ from "lodash";
const redis = new Redis();
export async function GET() {
  redis.publish("wibu", _.random(99, 999) + "", (error, count) => {
    console.log("wibu from server", count);
  });
  return Response.json({ name: "wibu" });
}
