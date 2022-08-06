import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locations: [],
    currentLocation: null,
    recording: false,
    recordName: "",
};

const locationSlice = createSlice({
    name: "locationSlice",
    initialState,
    reducers: {
        setCurrentLocation: (state, action) => {
            state.currentLocation = action.payload;
            if (state.recording) {
                state.locations = [...state.locations, action.payload];
            }
        },
        startRecording: (state) => {
            state.recording = true;
        },
        stopRecording: (state) => {
            state.recording = false;
        },
        setRecordName: (state, action) => {
            state.recordName = action.payload;
        },
        trancatLocationList: (state) => {
            state.locations = [];
        },
    },
});

export const {
    setCurrentLocation,
    startRecording,
    stopRecording,
    setRecordName,
    trancatLocationList,
} = locationSlice.actions;

export default locationSlice.reducer;
