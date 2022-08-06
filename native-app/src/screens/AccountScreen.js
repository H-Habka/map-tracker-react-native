import {
    View,
    Image,
    Button,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/featuers/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

const AccountScreen = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await AsyncStorage.removeItem("token");
        dispatch(logoutAction());
    };
    return (
        <ScrollView style={[tw`pt-10`]}>
            <View style={[tw`mb-20`]}>
                <Image
                    source={{
                        uri: "data:image/jpeg;base64,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",
                    }}
                    style={[tw`w-full h-56`]}
                />

                <View
                    style={[
                        tw`w-40 h-40 rounded-full bg-blue-300 justify-center items-center`,
                        styles.profile,
                    ]}
                >
                    <View
                        style={[
                            tw`w-full h-full bg-green-800 rounded-full border-4`,
                        ]}
                    >
                        <Image
                            style={[tw`w-full h-full rounded-full`]}
                            source={{
                                uri: "data:image/jpeg;base64,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",
                            }}
                        />
                    </View>
                </View>

                <View
                    style={[tw`absolute right-3 top-4`, styles.logout]}
                >
                    <TouchableOpacity onPress={handleLogout}>
                        <AntDesign name="logout" size={30} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    profile: {
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: [{ translateX: -80 }, { translateY: 80 }],
    },
    logout: {},
});

export default AccountScreen;
