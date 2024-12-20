import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  useColorScheme,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { Exercise } from "../../../src/models/Exercise";
import { ExerciseService } from "../../../src/services/ExerciseService";
import { ExerciseTypes } from "../../../src/utils/enums";
import { UserExercise } from "../../../src/models/UserExercise";
import { useSession } from "../../../src/contexts/AuthContext";
import LoadingAnim from "../../../src/assets/walking.gif";
import PHCeb4 from "../../../src/assets/ph_cebu_4.png";
import ExerciseCard from "../../../src/components/ExerciseCard";
import ExerciseModal from "../../../src/components/ExerciseModal";
import { useFocusEffect, useRouter } from "expo-router";
import { useContributorContext } from "../../../src/contexts/ContributorContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function VocabularyExercises() {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("VOCABULARY_EXERCISES page loaded.");
  }, []);

  const colorScheme = useColorScheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Exercise[]>([]);
  const [progress, setProgress] = useState<UserExercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [exerIndexOnFocus, setExerIndexOnFocus] = useState();
  const [exerIDOnFocus, setExerIDOnFocus] = useState();
  const [exerTopicOnFocus, setExerTopicOnFocus] = useState("");
  const { getUserUUID } = useSession();
  const { isContributor } = useContributorContext();

  useFocusEffect(
    useCallback(() => {
      loadExercises();
    }, [])
  );

  const loadExercises = async () => {
    try {
      setIsLoading(true);
      let progress = await ExerciseService.getUserExerciseProgress(
        getUserUUID() ?? ""
      );
      if (progress) {
        setProgress(progress);
      }
      console.log(getUserUUID());
      console.log(progress);
      let data = await ExerciseService.getAllExercisesByType(
        ExerciseTypes.Vocabulary
      );
      if (data) {
        setResults(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkExerciseCompletion = (exercise_id: number) => {
    const level = progress.find((exercise) => {
      return exercise.exercise_id == exercise_id;
    })?.level;
    return !!level && level >= 6;
  };

  const getLevel = (exerID: number) => {
    const level = progress.find((exercise) => {
      return exercise.exercise_id == exerID;
    })?.level;

    if (!level) return 0;
    return level;
  };

  const handleExerciseEvent = async (exerID, exerTopic, eventType) => {
    ExerciseService.hasUserAccessedExercise(exerID, getUserUUID() ?? "");

    {
      /*Edit to enum later?? This is garbage*/
    }
    if (eventType == "START") {
      router.push({
        pathname: `exercises/vocabulary/${exerID}`,
      });
    } else if (eventType == "EDIT") {
      router.push({
        pathname: `exercises/vocabulary/${exerID}/edit`,
      });
    }
    setModalVisible(false);
  };

  const changeExerFocus = (exerID, exerTopic, index) => {
    setExerIndexOnFocus(index);
    setExerIDOnFocus(exerID);
    setExerTopicOnFocus(exerTopic);
    setModalVisible(true);
  };

  if (isLoading) {
    return (
      <>
        <ImageBackground
          source={PHCeb4}
          style={styles.headerTitleContainer}
          resizeMode="cover"
        >
          {/* Overlay View */}
          <View style={styles.overlay} />

          <View style={styles.contentContainer}>
            <Text style={styles.headerTitle}>Vocabulary</Text>
            <Text style={styles.headerSubtitle}>
              Let's get to know basic everyday things in the Cebuano language!
              What good is comprehension when you don't know what words mean?
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.exerciseCategoryContainerLoading}>
          <Image source={LoadingAnim} style={{ width: 100, height: 100 }} />
          <Text style={styles.loadingText}>
            Please wait a moment while{"\n"} we prepare things around here...
          </Text>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      </>
    );
  }

  return (
    <>
      <ImageBackground
        source={PHCeb4}
        style={styles.headerTitleContainer}
        resizeMode="cover"
      >
        {/* Overlay View */}
        <View style={styles.overlay} />

        <View style={styles.contentContainer}>
          <Text style={styles.headerTitle}>Vocabulary</Text>
          <Text style={styles.headerSubtitle}>
            Let's get to know basic everyday things in the Cebuano language!
            What good is comprehension when you don't know what words mean?
          </Text>
          {isContributor && (
            <TouchableOpacity
              style={{
                width: "auto",
                marginRight: "auto",
              }}
              onPress={() =>
                router.push({ pathname: "/exercises/vocabulary/create" })
              }
            >
              <Text
                style={{
                  color: "aqua",
                  marginTop: 15,
                  fontSize: 18,
                  fontWeight: "900",
                  borderWidth: 2,
                  borderColor: "aqua",
                  borderRadius: 10,
                  padding: 5,
                  paddingBottom: 0,
                }}
              >
                <Icon name={"plus"} size={20} color="aqua" />
                &nbsp;CREATE EXERCISE
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>

      <ScrollView style={styles.exerciseCategoryContainer}>
        <View style={styles.barContainer}>
          <View style={styles.randomHorizontalBar}>
            <Text>{" " /* Please do not ask why this is here. */}</Text>
          </View>
        </View>

        {results.map((result, index) => (
          <ExerciseCard
            key={result.id}
            title={result.topic}
            subtitle={result.description}
            progress={getLevel(result.id)}
            onPress={() => changeExerFocus(result.id, result.topic, index)}
          />
        ))}
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
  headerTitleContainer: {
    paddingTop: "8%",
    paddingBottom: "15%",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "dodgerblue",
    opacity: 0.65,
  },
  contentContainer: {
    paddingLeft: "6%",
    paddingRight: "6%",
  },
  headerTitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  headerSubtitle: {
    marginTop: "2.5%",
    color: "white",
    fontSize: 14,
  },
  exerciseCategoryContainer: {
    padding: "3%",
    marginTop: "-5%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  exerciseCategoryContainerLoading: {
    flex: 1,
    marginTop: "-5%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "400",
    color: "gray",
    textAlign: "center",
    marginBottom: 25,
  },
  barContainer: {
    marginTop: "3%",
    marginBottom: "6.5%",
    justifyContent: "center",
    alignItems: "center",
    height: "1%",
  },
  randomHorizontalBar: {
    borderRadius: 30,
    width: "15%",
    backgroundColor: "lightgray",
  },
});
