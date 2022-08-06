import { View, ActivityIndicator } from "react-native";


const Spinner = () => {
    return (
        <View>
            <ActivityIndicator color="blue" size={40}/>
        </View>
    );
};

export default Spinner;
