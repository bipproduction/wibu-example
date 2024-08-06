'use client'
import { Image, Stack, Text } from "@mantine/core"
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


export function MapBox({ mapboxToken }: { mapboxToken: string }) {
    const [lat, lng] = [-8.736920465855105, 115.17599049809579]
    return <Stack>
        <Map

            mapboxAccessToken={mapboxToken}
            initialViewState={{
                longitude: lng,
                latitude: lat,
                zoom: 14
            }}
            style={{ width: 600, height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker style={{
                width: 50,
                height: 50
            }} longitude={lng} latitude={lat} anchor="bottom" >
                <Stack gap={0} > 
                    <Image w={"100%"} alt="image" src="https://cdn-icons-png.flaticon.com/512/5860/5860579.png" />
                    <Text  bg={"dark"} style={{
                        textAlign: "center",
                        borderRadius: 12
                    }} fz={"sm"} c={"cyan"}>markas wibu</Text>
                </Stack>
            </Marker>
        </Map>
    </Stack>
}