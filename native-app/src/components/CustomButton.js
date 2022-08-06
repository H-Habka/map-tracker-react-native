import { View, Text, Pressable, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

const CustomButton = ({ title, onPress }) => {
    return (
        <View style={[tw`mt-6`]}>
            <TouchableOpacity style={[tw`items-center`]} onPress={onPress}>
                <Text style={[tw` text-2xl font-bold text-blue-500`]}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomButton;
