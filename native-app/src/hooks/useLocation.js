import { useState, useEffect } from "react";
import {
    Accuracy,
    requestForegroundPermissionsAsync,
    watchPositionAsync,
} from "expo-location";

export default (shouldTrack, callback) => {
    const [error, setError] = useState("");
    const [subscriber, setSubscriber] = useState(null);

    const stateWatching = async () => {
        try {
            await requestForegroundPermissionsAsync();
            const sub = await watchPositionAsync(
                {
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 100,
                    distanceInterval: 10,
                },
                callback
            );
            setSubscriber(sub);
        } catch (err) {
            console.log(err);
            setError(err);
        }
    };

    useEffect(() => {
        if (shouldTrack) {
            stateWatching();
        } else {
            if (subscriber) {
                subscriber.remove();
                setSubscriber(null);
            }
        }
    }, [shouldTrack]);

    return { error };
};
