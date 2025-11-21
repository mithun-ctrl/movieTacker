import {Redis} from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import Config from "../config/Config.js";

const redis = new Redis({
    url: Config.UPSTASH_REDIS_REST_URL,
    token: Config.UPSTASH_REDIS_REST_TOKEN,
});

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1000, "60 s"),
})

export default rateLimit;