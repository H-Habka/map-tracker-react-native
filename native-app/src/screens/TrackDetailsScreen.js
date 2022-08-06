import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Api from "../../api";
import MapView, { Polyline} from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { Spinner } from "../components";

const TrackDetailsScreen = ({ route }) => {
    const isFocused = useIsFocused();
    const [waitOneSecond, setWaitOneSecond] = useState(false);
    const [track, setTrack] = useState('');

    const { _id } = route.params;

    useEffect(() => {
        setTimeout(() => {
            setWaitOneSecond(true);
        }, 1000);
    }, []);

    useEffect(() => {
        if (isFocused)
            Api.get(`/tracks/${_id}`)
                .then((res) => {
                    setTrack(res.data);
                })
                .catch((err) => console.log(err));
    }, [isFocused]);

    if(!track)return <Spinner />
    return (
        <ScrollView style={[tw`mt-4`]}>
            <Text style={[tw`text-center text-3xl font-bold`]}>{track.name}</Text>
            {waitOneSecond ? (
                <MapView
                    style={[tw`h-96 w-full mt-5`]}
                    initialRegion={{
                        ...track?.locations[0]?.coords,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                    }}
                    region={{
                        ...track?.locations[0]?.coords,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                    }}
                >
                    <Polyline
                        coordinates={track?.locations?.map(
                            (location) => location.coords
                        )}
                    />
                </MapView>
            ) : (
                <MapView style={[tw`w-full h-96 mt-5`]} />
            )}
        </ScrollView>
    );
};

export default TrackDetailsScreen;
