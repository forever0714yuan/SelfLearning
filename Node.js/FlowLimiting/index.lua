local key = KEYS[1]
local limit = tonumber(ARGV[1])
local interval = tonumber(ARGV[2])

local count = tonumber(redis.call('get', key) or "0")
if count + 1 > limit then
    return 0
else
    redis.call('incr', key)
    redis.call('expire', key, interval)
    return 1
end
