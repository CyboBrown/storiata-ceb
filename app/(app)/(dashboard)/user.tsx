import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Exercise } from "../../../src/models/Exercise";
import { ExerciseService } from "../../../src/services/ExerciseService";
import { useSession } from "../../../src/contexts/AuthContext";
import StatCard from "../../../src/components/StatCard";
import WordStatIcon from "../../../src/assets/contr_stat_word_icon.png";
import ExerStatIcon from "../../../src/assets/contr_stat_exercises_icon.png";
import ExerciseCard from "../../../src/components/ExerciseCard";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DashboardService } from "../../../src/services/DashboardService";
import { UserExercise } from "../../../src/models/UserExercise";
import ExerciseModal from "../../../src/components/ExerciseModal";
import { useContributorContext } from "../../../src/contexts/ContributorContext";
import { router, useFocusEffect } from "expo-router";

export default function Dashboard() {
  const [exerCompleted, setExerCompleted] = useState(0);
  const [wordsMistaken, setWordsMistaken] = useState(0);
  const [ongoingExercises, setOngoingExercises] = useState<UserExercise[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const [exerIndexOnFocus, setExerIndexOnFocus] = useState();
  const [exerIDOnFocus, setExerIDOnFocus] = useState();
  const [exerTopicOnFocus, setExerTopicOnFocus] = useState("");
  const { getUserUUID } = useSession();
  const { isContributor } = useContributorContext();

  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("USER_DASHBOARD page loaded.");
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadStatistics();
    }, [])
  );

  const loadStatistics = async () => {
    const stat1 = await DashboardService.getTotalMistakenWords(
      getUserUUID() ?? ""
    );
    setWordsMistaken(stat1);
    const stat2 = await DashboardService.getTotalExercisesCompleted(
      getUserUUID() ?? ""
    );
    setExerCompleted(stat2);
    const exers = await DashboardService.getOngoingExercises(
      getUserUUID() ?? "",
      5
    );
    console.log(exers);
    exers && setOngoingExercises(exers);
  };

  const handleExerciseEvent = async (exerID, exerTopic, eventType) => {
    ExerciseService.hasUserAccessedExercise(exerID, getUserUUID() ?? "");
    {
      /*Edit to enum later?? This is garbage*/
    }
    console.log(typeof exerID + exerID);
    if (eventType == "START") {
      router.push({
        pathname: `exercises/vocabulary/${exerID}`,
      });
    } else if (eventType == "EDIT") {
      router.push({
        pathname: `exercises/vocabulary/${exerID}/edit`,
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
    <>
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
              title="Exercises Completed"
              value={exerCompleted.toString()}
            />
          </View>
          <View style={styles.rightColumn}>
            <StatCard
              image={ExerStatIcon}
              title="Weak Words"
              value={wordsMistaken.toString()}
            />
          </View>
        </View>
        <TouchableOpacity>
          <View style={styles.mistakenWordsButton}>
            <Icon name="clipboard-text-search-outline" size={24} color="gray" />
            <Text style={{ color: "gray", fontWeight: "700" }}>
              {"  "}View All Mistaken Words
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            marginTop: "2.5%",
            paddingLeft: "4.5%",
            paddingRight: "4.5%",
          }}
        >
          <Text style={{ fontSize: 21, fontWeight: "800", color: "gray" }}>
            Resume Unfinished Exercises
          </Text>
        </View>
        <View style={{ padding: "3.5%" }}>
          {ongoingExercises &&
            ongoingExercises.map((exer, index) => (
              <ExerciseCard
                key={exer.id}
                title={exer.topic ?? ""}
                subtitle={exer.description ?? ""}
                progress={exer.level}
                onPress={() => changeExerFocus(exer.id, exer.topic, index)}
              />
            ))}
          <ExerciseCard
            title="SAMPLE EXERCISE"
            subtitle="I don't know, I just got here."
            progress={5}
          />
        </View>
      </ScrollView>
      <ExerciseModal
        userIsContributor={isContributor}
        exerciseTitle={`Vocabulary ${
          exerIndexOnFocus + 1
        } - ${exerTopicOnFocus}`}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleRedirect={() =>
          handleExerciseEvent(exerIDOnFocus, exerTopicOnFocus, "START")
        }
        handleRedirectEdit={() =>
          handleExerciseEvent(exerIDOnFocus, exerTopicOnFocus, "EDIT")
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
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
  mistakenWordsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "3.5%",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "3%",
    marginBottom: "3%",
    borderRadius: 30,
  },
});
