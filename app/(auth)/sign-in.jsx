import { View, SafeAreaView, ScrollView, Image, Text } from "react-native";

import { images } from "../../constants";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">
            Login in to Aora
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
