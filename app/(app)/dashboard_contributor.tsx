import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSession } from "../../src/services/auth-context";
import NavAvatarIcon from "../../src/components/NavAvatarIcon";
import { AccountService } from "../../src/services/AccountService";

export default function ContributorDashboard() {
  const { session, getUserUUID } = useSession();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("USER#0000");
  const userUUID = getUserUUID();

  useEffect(() => {
    if (session) getUsername();
  }, [session]);

  async function getUsername() {
    try {
      setLoading(true);
      if (!session) throw new Error("No user on the session!");

      let data = await AccountService.getProfile(getUserUUID());
      if (data?.username) {
        setUsername(data.username);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <NavAvatarIcon userID={userUUID} size={90} />
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>{username}</Text>
          <Text style={styles.text}>CONTRIBUTOR</Text>
        </View>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "95%",
    height: 100,
    alignSelf: "center",
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  leftColumn: {
    flex: 0.3,
    marginRight: 10,
    justifyContent: "center",
  },
  rightColumn: {
    flex: 0.7,
  },
  textContainer: {
    justifyContent: "center",
  },
  headerText: {
    marginTop: 20,
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 24,
  },
  text: {
    color: "gray",
    fontWeight: "bold",
  },
});