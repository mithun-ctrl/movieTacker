import {Redis} from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
    url: 'https://funny-mustang-37089.upstash.io',
    token: 'AZDhAAIncDIxZmE1YmU2ZTI0OTU0YWYxOTdjMmJlODgyZWY4MjBkZHAyMzcwODk',
});

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1000, "60 s"),
})

export default rateLimit;