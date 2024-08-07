import { Stack, Text } from "@mantine/core";
import { getName } from "./_lib/redis";
import getRedisInstance from "./_lib/redis_instance";
import { CreateRedis } from "./_ui/CreateRedis";


const redis = getRedisInstance();
const channel = 'wibu';

// Avoid multiple subscriptions by checking if already subscribed
if (!(redis as any).subscribed) {
    (redis as any).subscribed = true;
    redis.subscribe(channel, (err, count) => {
        if (err) {
            console.error('Error subscribing to Redis channel:', err);
        } else {
            console.log(`Subscribed to ${count} channel(s). Listening for updates on the ${channel} channel.`);
        }
    });

    redis.on('message', (channel, message) => {
        console.log(`Received message from ${channel}: ${message}`);
        // You can handle the message here
    });
}

export default async function Page() {
    const name = await getName()

    return <Stack p={"md"} flex={1}>
        <Text>Redis</Text>
        {name}
        <CreateRedis />
    </Stack>
}