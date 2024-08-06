import { Stack } from "@mantine/core";
import { MapBox } from "./_component/MapBox";
const mapboxToken = process.env.MAPBOX_TOKEN!

export default function Page() {
    if(!mapboxToken) throw new Error("mapbox token not found")
    return <Stack p={"md"}>
        ini adalah page meap
        <MapBox mapboxToken={mapboxToken} />
    </Stack>
}
