import { View, Text, FlatList } from "react-native";
import tw from "tailwind-react-native-classnames";
import TrackItem from './TrackItem'

const TracksList = ({ listOfitems, navigation }) => {
    return (
        <View style={[tw` p-2`]}>
            <FlatList
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <TrackItem item={item} onPress={() => navigation.navigate("Details",{_id : item._id})}/>}
                data={listOfitems}
            />
        </View>
    );
};

export default TracksList;
