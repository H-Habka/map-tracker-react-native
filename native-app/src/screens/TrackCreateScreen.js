// import '../_MocLocation'
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import MapView, { Polyline, Circle } from "react-native-maps";
import { setCurrentLocation } from "../../redux/featuers/locationSlice";
import { useDispatch, useSelector } from "react-redux";
import useLocation from "../hooks/useLocation";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { TrackForm } from "../components";

const TrackCreateScreen = ({ navigation }) => {
    const [waitOneSecond, setWaitOneSecond] = useState(false);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const { currentLocation, recording, locations } = useSelector((state) => ({
        ...state.locationSlice,
    }));
    const { error } = useLocation(isFocused || recording, (location) => {
        dispatch(setCurrentLocation(location));
    });

    useEffect(() => {
        setTimeout(() => {
            setWaitOneSecond(true);
        }, 1000);
    }, []);

    if (!currentLocation) {
        return (
            <ActivityIndicator style={[tw`mt-20`]} size="large" color="blue" />
        );
    }

    return (
        <ScrollView style={[tw`pt-10`]}>
            {waitOneSecond ? (
                <MapView
                    style={[tw`h-80 w-full`]}
                    initialRegion={{
                        ...currentLocation.coords,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                    }}
                    region={{
                        ...currentLocation.coords,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                    }}
                >
                    <Circle
                        center={currentLocation.coords}
                        radius={200}
                        strokeColor="rgba(158,158,255,1)"
                        fillColor="rgba(158,158,255,0.4)"
                    />
                    <Polyline
                        coordinates={locations.map(
                            (location) => location.coords
                        )}
                    />
                </MapView>
            ) : (
                <MapView style={[tw`h-80 w-full`]} />
            )}
            {error ? <Text>Pleass enable location</Text> : null}

            <TrackForm navigation={navigation} />
        </ScrollView>
    );
};

export default TrackCreateScreen;
