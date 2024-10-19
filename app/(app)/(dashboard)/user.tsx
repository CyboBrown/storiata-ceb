import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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
import LoadingAnim from "../../../src/assets/walking.gif";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [exerCompleted, setExerCompleted] = useState(0);
  const [wordsMistaken, setWordsMistaken] = useState(0);
  const [ongoingExercises, setOngoingExercises] = useState<UserExercise[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const [exerIndexOnFocus, setExerIndexOnFocus] = useState();
  const [exerIDOnFocus, setExerIDOnFocus] = useState();
  const [exerTopicOnFocus, setExerTopicOnFocus] = useState("");
  const [exerOnFocus, setExerOnFocus] = useState<Exercise>();
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
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  // fuck me mate, where in Hoshino's fucking dream did you pull this horror from
  const handleExerciseEvent = async (exerID) => {
    let exerType = "UNKNOWN";
    const exerDetails = await ExerciseService.getExerciseDetails(exerID);
    ExerciseService.hasUserAccessedExercise(exerID, getUserUUID() ?? "");

    switch (exerDetails?.type) {
      case 1:
        exerType = "vocabulary";
        break;
      case 2:
        exerType = "grammar";
        break;
      case 3:
        exerType = "listening";
        break;
      default:
        console.log("oh nyo");
        break;
    }

    setModalVisible(false);
    router.navigate({
      pathname: `exercises/${exerType}/${exerID}`,
    });
  };

  const changeExerFocus = (exerID, exerTopic, index) => {
    setExerIndexOnFocus(index);
    setExerIDOnFocus(exerID);
    setExerTopicOnFocus(exerTopic);
    setModalVisible(true);
  };

  if (isLoading) {
    return (
      <View style={styles.exerciseCategoryContainerLoading}>
        <Image source={LoadingAnim} style={{ width: 100, height: 100 }} />
        <Text style={styles.loadingText}>
          Please wait a moment while{"\n"} we prepare things around here...
        </Text>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  }

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
        {/* <TouchableOpacity>
          <View style={styles.mistakenWordsButton}>
            <Icon name="clipboard-text-search-outline" size={24} color="gray" />
            <Text style={{ color: "gray", fontWeight: "700" }}>
              {"  "}View All Mistaken Words
            </Text>
          </View>
        </TouchableOpacity> */}

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
          {ongoingExercises ? (
            ongoingExercises.map((exer, index) => (
              <ExerciseCard
                key={index}
                title={exer.topic ?? ""}
                subtitle={exer.description ?? ""}
                progress={exer.level}
                onPress={() => changeExerFocus(exer.exercise_id, exer.topic, index)}
              />
            ))}
        </View>
      </ScrollView>
      <ExerciseModal
        userIsContributor={isContributor}
        exerciseTitle={`Ongoing Exercise ${
          exerIndexOnFocus + 1
        } - ${exerTopicOnFocus}`}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleRedirect={() =>
          handleExerciseEvent(exerIDOnFocus)
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
  exerciseCategoryContainerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "400",
    color: "gray",
    textAlign: "center",
    marginBottom: 25,
  },
});
