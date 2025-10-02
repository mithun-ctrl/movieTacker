import {Redis} from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = Redis.fromEnv();

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(200, "60 s"),
})

export default rateLimit;