import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import CustomInputField from "./CustomInputField";
import { useDispatch, useSelector } from "react-redux";
import {
    startRecording,
    stopRecording,
    setRecordName,
    trancatLocationList,
} from "../../redux/featuers/locationSlice";
import Api from "../../api";

const TrackForm = ({navigation}) => {
    const { recordName, recording, locations } = useSelector((state) => ({
        ...state.locationSlice,
    }));
    const dispatch = useDispatch();


    const saveTrack = () => {
        Api.post("/tracks", { name: recordName, locations })
            .then((res) => {
                dispatch(setRecordName(""));
                dispatch(trancatLocationList());
            })
            .catch((err) => {
                alert("some thing wrong");
            });
            navigation.navigate("Info")
    };
    return (
        <View style={[tw`mt-4 p-3`]}>
            <CustomInputField
                label="Enter Name"
                value={recordName}
                setValue={(text) => dispatch(setRecordName(text))}
            />
            {recording ? (
                <Button
                    color="red"
                    title="Stop Recording"
                    onPress={() => dispatch(stopRecording())}
                />
            ) : (
                <Button
                    title="Start Recording"
                    onPress={() => dispatch(startRecording())}
                />
            )}
            {locations.length && !recording ? (
                <View style={[tw`mt-2 mx-10 rounded-2xl overflow-hidden `]}>
                    <Button
                        color="#056ca5"
                        title="Save The Record"
                        onPress={saveTrack}
                    />
                </View>
            ) : null}
        </View>
    );
};

export default TrackForm;
