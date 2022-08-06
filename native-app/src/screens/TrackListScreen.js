import { View, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import Api from "../../api";
import { useState, useEffect } from "react";
import { Spinner, TracksList } from "../components";
import { useIsFocused } from "@react-navigation/native";

const TrackListScreen = ({ navigation }) => {
    const [listOfTracks, setListOfTracks] = useState([]);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            Api.get("/tracks")
                .then((res) => {
                    setListOfTracks(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log({ err });
                    setLoading(false);
                });
        }
    }, [isFocused]);

    if (loading)
        return (
            <View style={[tw`mt-6`]}>
                <Spinner />
            </View>
        );

    return (
        <View style={[tw`flex-1 mb-6`]}>
            {/* <Text style={[tw`text-2xl font-bold text-center`]}>TrackListScreen</Text> */}

            {listOfTracks.length ? (
                <TracksList
                    listOfitems={listOfTracks}
                    navigation={navigation}
                />
            ) : (
                <Text
                    style={[
                        tw`text-center text-2xl mt-10 font-semibold text-blue-800`,
                    ]}
                >
                    You Did not Recorde Any track Yet
                </Text>
            )}
        </View>
    );
};

export default TrackListScreen;
