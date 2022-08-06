import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import { CustomButton, CustomInputField, Spinner } from "../components";
import { SingupAction } from "../../redux/featuers/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Api from '../../api'

const SigninScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleButtonPress = () => {
        if (email && password) {
            setLoading(true);
            Api
                .post("/signin", { email, password })
                .then(async (res) => {
                    dispatch(SingupAction(res.data));
                    await AsyncStorage.setItem("token", res.data.token)
                    setLoading(false);
                })
                .catch((err) => {
                    alert("some Thing Wrong");
                    setLoading(false);
                });
        } else {
            alert("Please Enter Email And Password");
        }
    };

    return (
        <View style={[tw`h-full justify-center p-2`]}>
            {loading ? (
                <Spinner />
            ) : (
                <View style={[tw`bg-blue-100 p-4 rounded-3xl`]}>
                    <CustomInputField
                        label="Email"
                        value={email}
                        setValue={setEmail}
                    />
                    <CustomInputField
                        label="Password"
                        value={password}
                        setValue={setPassword}
                    />
                    <CustomButton title="Signin" onPress={handleButtonPress} />

                    <Text style={[tw`text-lg mx-auto pt-6`]}>
                        Don't have an account?{" "}
                        <Text style={[tw`text-blue-800 font-bold`]} onPress={() => {
                            navigation.navigate('signup')
                        }}>
                            Signup
                        </Text>{" "}
                        insted
                    </Text>
                </View>
            )}
        </View>
    );
};

export default SigninScreen;
