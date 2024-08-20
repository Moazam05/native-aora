import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={[
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
        ]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text className="text-3xl text-white">{item.id}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-medium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Salman
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMethod="contain"
                />
              </View>
            </View>

            {/* Search Bar */}
            <SearchInput placeholder="Search latest videos..." />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
