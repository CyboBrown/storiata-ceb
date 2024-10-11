import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useSession } from "../../src/services/auth-context";
import NavAvatarIcon from "../../src/components/NavAvatarIcon";
import { AccountService } from "../../src/services/AccountService";
import WordStatIcon from "../../src/assets/contr_stat_word_icon.png";
import ExerStatIcon from "../../src/assets/contr_stat_exercises_icon.png";
import FavStatIcon from "../../src/assets/contr_stat_favs_icon.png";

export default function ContributorDashboard() {
  const { session, getUserUUID } = useSession();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("USER#0000");
  const userUUID = getUserUUID();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',  // Custom header title
      headerStyle: { backgroundColor: 'dodgerblue' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold' },
    });
  }, [navigation]);

  useEffect(() => {
    if (session) getUsername();
  }, [session]);

  async function getUsername() {
    try {
      setLoading(true);

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

    <View style={styles.statsContainer}>
      <View style={styles.statColumn}>
        <View style={styles.statCountContainer}><Text style={styles.statCount}>18</Text></View>
        <View style={styles.statLabelContainer}>
          <Image source={WordStatIcon} style={styles.flagIcon} />
          <Text style={styles.statLabel}>WORDS CONTRIBUTED</Text>
        </View>
      </View>
      <View style={styles.statColumn}>
        <View style={styles.statCountContainer}><Text style={styles.statCount}>4</Text></View>
        <View style={styles.statLabelContainer}>
          <Image source={ExerStatIcon} style={styles.flagIcon} />
          <Text style={styles.statLabel}>EXERCISES CONTRIBUTED</Text>
        </View>
      </View>
      <View style={styles.statColumn}>
        <View style={styles.statCountContainer}><Text style={styles.statCount}>0</Text></View>
        <View style={styles.statLabelContainer}>
          <Image source={FavStatIcon} style={styles.flagIcon} />
          <Text style={styles.statLabel}>LEARNER FAVOURITES</Text>
        </View>
      </View>
    </View>

    <View style={styles.recentWordsHeader}>
      <Text style={styles.recentWordsHeaderText}>
        RECENT CONTRIBUTED WORDS
      </Text>
    </View>

    <View style={styles.scrollContainerWrapper}>
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.recentWordsScrollContainer}
      >
        <View style={styles.item}>
          <Text style={styles.ctext}>Item 1</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.ctext}>Item 2</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.ctext}>Item 3</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.ctext}>Item 4</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.ctext}>Item 5</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.ctext}>Item 6</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.ctext}>Item 7</Text>
        </View>
      </ScrollView>
    </View>

    <View style={styles.recentWordsHeader}>
      <Text style={styles.recentWordsHeaderText}>
        RECENT CONTRIBUTED EXERCISES
      </Text>
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
    marginBottom: 15,
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
    elevation: 10,
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
  statsContainer: {
    flexDirection: 'row',
    width: "95%",
    alignSelf: "center",
    justifyContent: 'space-between',
    backgroundColor: 'dodgerblue',
    marginBottom: 15,
    borderRadius: 25,
    padding: 5,
    paddingBottom: 25,
    height: 160,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 10,
  },
  statColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  statCountContainer: {
    flex: 1,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabelContainer: {
    flex: 1,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statCount: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 32,
  },
  statLabel: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  recentWordsHeader: {
    width: "95%",
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  recentWordsHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  flagIcon: {
    width: 35,
    height: 35,
  },
  scrollContainerWrapper: {
    height: 215,
    alignSelf: "center", 
  },
  recentWordsScrollContainer: {
    backgroundColor: 'white',
    alignSelf: "center",
    padding: 15,
    paddingLeft: 8,
    justifyContent: 'center',  // Center the content vertically within the height
  },
  item: {
    width: 150,  // Set a fixed width for each item to enable horizontal scroll
    height: 200,
    borderRadius: 15,
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,  // Adds space between the items
  },
  ctext: {
    color: 'white',
    fontSize: 18,
  },
});