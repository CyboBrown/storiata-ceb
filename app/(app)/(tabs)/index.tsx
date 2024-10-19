import "react-native-url-polyfill/auto";
import { useContributorContext } from "../../../src/contexts/ContributorContext";
import Dashboard from "../(dashboard)/user";
import ContributorDashboard from "../(dashboard)/contributor";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import CustomHeader from "../../../src/components/HeaderTitle";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useSession } from "../../../src/contexts/AuthContext";
import { AccountService } from "../../../src/services/AccountService";
import { View, Text, StyleSheet } from "react-native";
import AvatarDisplay from "../../../src/components/AvatarDisplay";
import LoadingState from "../../../src/components/LoadingState";

export default function Homepage() {
  const [isLoading, setIsLoading] = useState(true);
  const [fullname, setFullname] = useState("Cebuano Enthusiast");
  const [username, setUsername] = useState("USER#0000");
  const { session, getUserUUID } = useSession();
  const { isContributor } = useContributorContext();

  const sessionUUID = getUserUUID() ?? "";
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CustomHeader pageTitle="Dashboard" />,  // Use Custom Header
      headerStyle: { backgroundColor: 'dodgerblue' },
      headerTintColor: 'white',
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getSessionUserInfo();
    }, [])
  );

  async function getSessionUserInfo() {
    try {
      setIsLoading(true);

      let user = await AccountService.getProfile(sessionUUID);
      if (user?.full_name) { setFullname(user?.full_name); }
      if (user?.username) { setUsername(user?.username); }
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) { <LoadingState isLightMode={true} /> }

  return (
    <>
      <View style={styles.headerProfileTab}>
        <AvatarDisplay userID={sessionUUID} size={90} borderRadius={100}/>
        <View style={{marginLeft: "4.5%"}}>
          <Text style={{color: "white", fontSize: 28, fontWeight: "900"}}>{fullname}</Text>
          <Text style={{color: "white", fontSize: 14, fontWeight: "500"}}>@{username}</Text>
          <View style={{backgroundColor: "mediumpurple", marginTop: "5%", marginLeft: "-3%", padding: "3.5%", alignItems: "center", borderRadius: 35}}>
            <Text style={{color: "white", fontSize: 14, fontWeight: "500"}}>{isContributor ? "CONTRIBUTOR" : "LEARNER"}</Text>
          </View>
        </View>
      </View>

      {isContributor ? <ContributorDashboard/> : <Dashboard/>}
    </>
  );
}

const styles = StyleSheet.create({
  headerProfileTab: {
    padding: "4.5%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "dodgerblue",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
});