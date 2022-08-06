import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from '@expo/vector-icons';

const TrackItem = ({ onPress, item}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[tw`p-2 flex-row justify-between items-center`]} >
            <Text style={[tw`text-xl`]}>{item.name}</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color="black" style={[tw`opacity-20`]} />
        </TouchableOpacity>
    );
};

export default TrackItem;
