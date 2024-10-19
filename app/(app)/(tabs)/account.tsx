import { useState, useEffect, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Alert,
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { AccountService } from "../../../src/services/AccountService";
import { useSession } from "../../../src/contexts/AuthContext";
import AvatarDisplay from "../../../src/components/AvatarDisplay";
import BackgroundCircle from "../../../src/components/BackgroundCircle";
import ProfileInfoCard from "../../../src/components/ProfileInfoCard";
import ProfileInteractableCard from "../../../src/components/ProfileInteractableCard";
import CustomHeader from "../../../src/components/HeaderTitle";
import LogoutModal from "../../../src/components/LogoutModal";
import LoadingAnim from "../../../src/assets/walking.gif";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("My Account");
  const [fullname, setFullname] = useState("Cebuano Enthusiast");
  const [email, setEmail] = useState(" ");
  const [website, setWebsite] = useState("No website indicated");
  const [isContributor, setIsContributor] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { session, getUserUUID, signOut } = useSession();

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    if (session) loadUserDetails();
  }, [session]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CustomHeader pageTitle={username} />, // Use Custom Header
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTintColor: "white",
    });
  }, [navigation, username]);

  async function loadUserDetails() {
    try {
      setLoading(true);
      let userDetails = await AccountService.getProfile(getUserUUID());
      let email = await AccountService.getUserEmail();

      if (userDetails?.avatar_url) {
        setAvatarUrl(userDetails.avatar_url);
      }
      if (userDetails?.username) {
        setUsername(userDetails.username);
      }
      if (userDetails?.full_name) {
        setFullname(userDetails.full_name);
      }
      if (userDetails?.is_contributor) {
        setIsContributor(userDetails.is_contributor);
      }
      if (userDetails?.website) {
        setWebsite(userDetails.website);
      }
      if (email) {
        setEmail(email);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <View style={styles.defaultContainer}>
          <Image source={LoadingAnim} style={{ width: 100, height: 100 }} />
          <Text style={styles.loadingText}>
            Please wait a moment while{"\n"} we prepare things around here...
          </Text>
          <ActivityIndicator size="large" color="white" />
        </View>
      </>
    );
  }

  return (
    <>
      {/*Fuck this garbage, this ain't gonna work universally.*/}
      <BackgroundCircle size={400} color="dodgerblue" top={-230} left={-180} />
      <BackgroundCircle size={400} color="dodgerblue" top={-230} left={140} />

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 12,
        }}
      >
        <View style={{ backgroundColor: "white", borderRadius: 100 }}>
          <AvatarDisplay userID={getUserUUID()} size={150} borderRadius={100} />
        </View>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "900" }}>{fullname}</Text>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>@{username}</Text>
      </View>

      <View style={styles.userTypeLabel}>
        {isContributor ? (
          <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
            CONTRIBUTOR
          </Text>
        ) : (
          <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
            LEARNER
          </Text>
        )}
      </View>

      <ScrollView>
        <View style={{ margin: 10, marginLeft: 15 }}>
          <Text style={{ fontWeight: "600", color: "gray" }}>User Details</Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 5,
            borderRadius: 20,
          }}
        >
          <ProfileInfoCard
            iconName="account"
            title="Full Name"
            description={fullname}
          />
          <ProfileInfoCard
            iconName="at"
            title="Username"
            description={username}
          />
          <ProfileInfoCard iconName="email" title="Email" description={email} />
          <ProfileInfoCard
            iconName="web"
            title="Website"
            description={website}
          />
          <ProfileInteractableCard
            iconName="account-cog"
            title="Change User Details"
            onPress={() =>
              router.push({
                pathname: "/settings/user-details",
                params: {
                  currAvatarURL: avatarUrl,
                  currFullname: fullname,
                  currUsername: username,
                  currEmail: email,
                  currWebsite: website,
                },
              })
            }
          />
        </View>

        <View style={{ margin: 10, marginLeft: 15 }}>
          <Text style={{ fontWeight: "600", color: "gray" }}>
            Help and Support
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 15,
            borderRadius: 20,
          }}
        >
          <ProfileInteractableCard
            iconName="logout"
            title="Log Out"
            onPress={() => setModalVisible(true)}
          />
          {/* <ProfileInteractableCard iconName="application-cog" title="Settings" /> */}
          <ProfileInfoCard
            iconName="cellphone"
            title="App Version"
            description="Alpha-build v.0.1.0"
          />
        </View>
      </ScrollView>

      <LogoutModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleLogOut={signOut}
      />
    </>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "dodgerblue",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 25,
  },
  userTypeLabel: {
    marginTop: "5%",
    marginBottom: "3%",
    marginLeft: "30%",
    marginRight: "30%",
    padding: 5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "dodgerblue",
  },
});
