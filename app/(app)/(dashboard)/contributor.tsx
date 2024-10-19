import { View, Text, StyleSheet, ScrollView } from "react-native";
import WordStatIcon from "../../../src/assets/contr_stat_word_icon.png";
import ExerStatIcon from "../../../src/assets/contr_stat_exercises_icon.png";
import FavStatIcon from "../../../src/assets/contr_stat_favs_icon.png";
import StatCard from "../../../src/components/StatCard";
import ExerciseCard from "../../../src/components/ExerciseCard";
import { DashboardService } from "../../../src/services/DashboardService";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "../../../src/contexts/AuthContext";
import { UserExercise } from "../../../src/models/UserExercise";
import { useContributorContext } from "../../../src/contexts/ContributorContext";
import { router, useFocusEffect } from "expo-router";
import { ExerciseService } from "../../../src/services/ExerciseService";
import { Word } from "../../../src/models/Word";
import { Exercise } from "../../../src/models/Exercise";

export default function ContributorDashboard() {
  const [wordContrib, setWordContrib] = useState(0);
  const [exerContrib, SetExerContrib] = useState(0);
  const [contribExercises, setContribExercises] = useState<Exercise[]>();
  const [contribWords, setContribWords] = useState<Word[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const [exerIndexOnFocus, setExerIndexOnFocus] = useState();
  const [exerIDOnFocus, setExerIDOnFocus] = useState();
  const [exerTopicOnFocus, setExerTopicOnFocus] = useState("");
  const { getUserUUID } = useSession();
  const { isContributor } = useContributorContext();

  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("CONTRIBUTOR_DASHBOARD page loaded.");
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadStatistics();
    }, [])
  );

  const loadStatistics = async () => {
    const stat1 = await DashboardService.getTotalWordsContributed(
      getUserUUID() ?? ""
    );
    setWordContrib(stat1);
    const stat2 = await DashboardService.getTotalExercisesContributed(
      getUserUUID() ?? ""
    );
    SetExerContrib(stat2);
    const words = await DashboardService.getNewestWordsContributed(
      getUserUUID() ?? "",
      10
    );
    words && setContribWords(words);
    const exers = await DashboardService.getNewestExercisesContributed(
      getUserUUID() ?? "",
      10
    );
    exers && setContribExercises(exers);
  };

  const handleExerciseEvent = async (exerID, exerTopic, eventType) => {
    ExerciseService.hasUserAccessedExercise(exerID, getUserUUID() ?? "");
    {
      /*Edit to enum later?? This is garbage*/
    }
    console.log(typeof exerID + exerID);
    if (eventType == "START") {
      router.push({
        // pathname: `exercises/vocabulary/${exerID}`,
        pathname: `exercises/vocabulary/`,
      });
    } else if (eventType == "EDIT") {
      router.push({
        // pathname: `exercises/vocabulary/${exerID}/edit`,
        pathname: `exercises/vocabulary/`,
      });
    }
  };

  const changeExerFocus = (exerID, exerTopic, index) => {
    setExerIndexOnFocus(index);
    setExerIDOnFocus(exerID);
    setExerTopicOnFocus(exerTopic);
    setModalVisible(true);
  };

  return (
    <ScrollView>
      <View
        style={{
          marginTop: "2.5%",
          marginBottom: "1.5%",
          paddingLeft: "4.5%",
          paddingRight: "4.5%",
        }}
      >
        <Text style={{ fontSize: 21, fontWeight: "800", color: "gray" }}>
          Statistics
        </Text>
      </View>
      <View style={styles.statisticsContainer}>
        <View style={styles.leftColumn}>
          <StatCard
            image={WordStatIcon}
            title="Words Contributed"
            value={wordContrib.toString()}
          />
          {/* <StatCard image={FavStatIcon} title="Future Stats" value="99" /> */}
        </View>
        <View style={styles.rightColumn}>
          <StatCard
            image={ExerStatIcon}
            title="Exercises Contributed"
            value={exerContrib.toString()}
          />
          {/* <StatCard image={FavStatIcon} title="Future Stats" value="99" /> */}
        </View>
      </View>

      <View
        style={{ marginTop: "2.5%", paddingLeft: "4.5%", paddingRight: "4.5%" }}
      >
        <Text style={{ fontSize: 21, fontWeight: "800", color: "gray" }}>
          Recently Contributed Words
        </Text>
      </View>
      <View style={styles.scrollContainerWrapper}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentWordsScrollContainer}
        >
          {contribWords &&
            contribWords?.map((item) => (
              <View style={styles.wordItem}>
                <Text style={{ fontSize: 64, marginBottom: 20 }}>
                  {item.representation}
                </Text>
                <Text
                  style={{ fontSize: 24, color: "gray", fontWeight: "900" }}
                >
                  {item.normal_form}
                </Text>
              </View>
            ))}
          <View style={styles.wordItem}>
            <Text
              style={{ fontSize: 64, marginBottom: 20 }}
              onPress={() => {
                router.push({
                  pathname: `dictionary/`,
                });
              }}
            >
              ➕
            </Text>
            <Text
              style={{ fontSize: 24, color: "gray", fontWeight: "900" }}
              onPress={() => {
                router.push({
                  pathname: `dictionary/`,
                });
              }}
            >
              Add New
            </Text>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          marginTop: "2.5%",
          marginBottom: "1.5%",
          paddingLeft: "4.5%",
          paddingRight: "4.5%",
        }}
      >
        <Text style={{ fontSize: 21, fontWeight: "800", color: "gray" }}>
          Recently Contributed Exercises
        </Text>
      </View>
      <ScrollView style={styles.recentExercisesContainer}>
        {contribExercises &&
          contribExercises.map((exer, index) => (
            <ExerciseCard
              key={exer.id}
              title={exer.topic ?? ""}
              subtitle={exer.description ?? ""}
              progress={0}
              onPress={() => {
                router.push({
                  pathname:
                    `exercises/` +
                    ["", "vocabulary", "grammar", "listening"].at(exer.type) +
                    "/" +
                    exer.id +
                    "/edit",
                });
              }}
              hideProgress
            />
          ))}
        <ExerciseCard
          title="Add New Vocabulary Exercise"
          subtitle="Add words from the same category"
          progress={0}
          onPress={() => {
            router.push({
              pathname: `exercises/vocabulary/create`,
            });
          }}
          hideProgress
          isAdd
        />
        <ExerciseCard
          title="Add New Grammar Exercise"
          subtitle="Auto-generate sentences by adding placeholders in sentences"
          progress={0}
          onPress={() => {
            router.push({
              pathname: `exercises/grammar/create`,
            });
          }}
          hideProgress
          isAdd
        />
        <ExerciseCard
          title="Add New Listening Exercise"
          subtitle="Add sentences for auto-generated speech"
          progress={0}
          onPress={() => {
            router.push({
              pathname: `exercises/listening/create`,
            });
          }}
          hideProgress
          isAdd
        />
      </ScrollView>
    </ScrollView>
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
  statisticsContainer: {
    flexDirection: "row",
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  leftColumn: {
    flex: 0.5,
  },
  rightColumn: {
    flex: 0.5,
  },
  scrollContainerWrapper: {
    height: 215,
    alignSelf: "center",
  },
  recentWordsScrollContainer: {
    alignSelf: "center",
    padding: 15,
    paddingLeft: 8,
    justifyContent: "center",
  },
  wordItem: {
    width: 150,
    height: 175,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  recentExercisesContainer: {
    padding: "3.5%",
  },
});
