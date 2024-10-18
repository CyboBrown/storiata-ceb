import { Session } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, View, Text, Image, StyleSheet, ImageBackground, ScrollView, useColorScheme } from "react-native";
import { Exercise } from "../../../src/models/Exercise";
import { ExerciseService } from "../../../src/services/ExerciseService";
import { ExerciseTypes } from "../../../src/utils/enums";
import { UserExercise } from "../../../src/models/UserExercise";
import { useSession } from "../../../src/contexts/AuthContext";
import { useFocusEffect, useRouter } from "expo-router";
import LoadingAnim from "../../../src/assets/walking.gif";
import PHCeb1 from "../../../src/assets/ph_cebu_1.png";
import ExerciseCard from "../../../src/components/ExerciseCard";
import ExerciseModal from "../../../src/components/ExerciseModal";

export default function ListeningExercises({ session }: { session: Session }) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("LISTENING_EXERCISES page loaded.");
  }, []);

  const colorScheme = useColorScheme();

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Exercise[]>([]);
  const [progress, setProgress] = useState<UserExercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [exerIndexOnFocus, setExerIndexOnFocus] = useState();
  const [exerIDOnFocus, setExerIDOnFocus] = useState();
  const [exerTopicOnFocus, setExerTopicOnFocus] = useState("");
  const { getUserUUID } = useSession();

  const router = useRouter();

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
      let data = await ExerciseService.getAllExercisesByType(
        ExerciseTypes.Listening
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
  }

  const handleExerciseEvent = async (exerID, exerTopic, eventType) => {
    ExerciseService.hasUserAccessedExercise(exerID, getUserUUID() ?? "");

    {/*Edit to enum later?? This is garbage*/}
    if (eventType == "START") {
      router.push({
        pathname: `exercises/listening/${exerID}`,
      });
    } else if (eventType == "EDIT") {
      router.push({
        pathname: `exercises/listening/${exerID}/edit`,
      });
    }
    setModalVisible(false);
  }

  const changeExerFocus = (exerID, exerTopic, index) => {
    setExerIndexOnFocus(index)
    setExerIDOnFocus(exerID);
    setExerTopicOnFocus(exerTopic);
    setModalVisible(true);
  }

  if (isLoading) {
    return (
      <>
        <ImageBackground
          source={PHCeb1}
          style={styles.headerTitleContainer}
          resizeMode="cover"
        >
          {/* Overlay View */}
          <View style={styles.overlay} />

          <View style={styles.contentContainer}>
            <Text style={styles.headerTitle}>Listening</Text>
            <Text style={styles.headerSubtitle}>
              To be natural at something, you have to simply observe and listen. 
              It's just the same as learning Cebuano! 
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.exerciseCategoryContainerLoading}>
          <Image
            source={LoadingAnim} 
            style={{ width: 100, height: 100 }}
          />
          <Text style={styles.loadingText}>Please wait a moment while{"\n"} we prepare things around here...</Text>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      </>
    )
  }

  return (
    <>
    <ImageBackground
      source={PHCeb1}
      style={styles.headerTitleContainer}
      resizeMode="cover"
    >
      {/* Overlay View */}
      <View style={styles.overlay} />

      <View style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Listening</Text>
        <Text style={styles.headerSubtitle}>
          To be natural at something, you have to simply observe and listen. 
          It's just the same as learning Cebuano! 
        </Text>
      </View>
    </ImageBackground>

    <ScrollView style={styles.exerciseCategoryContainer}>
      <View style={styles.barContainer}>
        <View style={styles.randomHorizontalBar}>
          <Text>{" " /* Please do not ask why this is here. */ }</Text>
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
      exerciseTitle={`Listening ${exerIndexOnFocus + 1} - ${exerTopicOnFocus}`} 
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible} 
      handleRedirect={() => handleExerciseEvent(exerIDOnFocus, exerTopicOnFocus, "START")}
      handleRedirectEdit={() => handleExerciseEvent(exerIDOnFocus, exerTopicOnFocus, "EDIT")}
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
    backgroundColor: 'dodgerblue',
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
    color: 'gray',
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