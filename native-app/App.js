import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
    AccountScreen,
    SignupScreen,
    SigninScreen,
    TrackCreateScreen,
    TrackListScreen,
    TrackDetailsScreen,
} from "./src/screens";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SingupAction } from "./redux/featuers/userSlice";
import tw from "tailwind-react-native-classnames";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const LoginAndSignupStack = createNativeStackNavigator();
const TrackListAndDetailsStack = createNativeStackNavigator();
const BottomTap = createBottomTabNavigator();

const Stack1 = () => {
    return (
        <LoginAndSignupStack.Navigator
            initialRouteName="signup"
            screenOptions={{
                headerShown: false,
            }}
        >
            <LoginAndSignupStack.Screen
                name="signin"
                component={SigninScreen}
            />
            <LoginAndSignupStack.Screen
                name="signup"
                component={SignupScreen}
            />
        </LoginAndSignupStack.Navigator>
    );
};

const Stack2 = () => {
    return (
        <TrackListAndDetailsStack.Navigator initialRouteName="List">
            <TrackListAndDetailsStack.Screen
                name="List"
                component={TrackListScreen}
                options= {{
                    title : 'TrackListScreen'
                }}
            />
            <TrackListAndDetailsStack.Screen
                name="Details"
                component={TrackDetailsScreen}
            />
        </TrackListAndDetailsStack.Navigator>
    );
};

const BottomNavigateor = () => {
    return (
        <BottomTap.Navigator
            initialRouteName="Account"
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: [tw`font-bold`],
                tabBarActiveTintColor: "blue",
            }}
        >
            <BottomTap.Screen
                name="Info"
                component={Stack2}
                options={{
                    tabBarLabelStyle: [tw`font-bold`],
                    tabBarIcon: () => (
                        <Entypo
                            name="info-with-circle"
                            size={20}
                            color="#0394fc"
                        />
                    ),
                }}
            />
            <BottomTap.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons
                            name="account-circle"
                            size={24}
                            color="#0394fc"
                        />
                    ),
                }}
            />
            <BottomTap.Screen
                name="Create"
                component={TrackCreateScreen}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5
                            name="map-marker-alt"
                            size={24}
                            color="#0394fc"
                        />
                    ),
                }}
            />
        </BottomTap.Navigator>
    );
};

const Navigation = () => {
    const user = useSelector((state) => state.userSlice.user);
    const [readyState, setReadyState] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const getTokenFromLoaclStorage = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) dispatch(SingupAction({ token }));
            setReadyState(true);
        };
        getTokenFromLoaclStorage();
    }, []);

    return (
        <>
            {readyState ? (
                <NavigationContainer>
                    {user ? <BottomNavigateor /> : <Stack1 />}
                </NavigationContainer>
            ) : null}
        </>
    );
};

export default function reduxWrapper() {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
}
