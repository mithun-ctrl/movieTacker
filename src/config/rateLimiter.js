import rateLimit from "../libs/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const identifer = req.ip || "global";
        const {success} = await rateLimit.limit(identifer);

        if(!success){
            return res.status(429).send({
                message: "Too many requests, try again later.",
            });
        }
        next();
    } catch (error) {
        console.log("error rate limiter", error);
        next(error);
    }
}

export default rateLimiter;