import { useEffect, useState } from "react";
import { Alert, useColorScheme, View, Text, StyleSheet, ImageBackground, ScrollView, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { Exercise } from "../../../src/models/Exercise";
import { ExerciseService } from "../../../src/services/ExerciseService";
import { ExerciseTypes } from "../../../src/utils/enums";
import { UserExercise } from "../../../src/models/UserExercise";
import { useSession } from "../../../src/contexts/AuthContext";
import LoadingAnim from "../../../src/assets/walking.gif";
import PHCeb4 from "../../../src/assets/ph_cebu_4.png";
import ExerciseCard from "../../../src/components/ExerciseCard";
import ExerciseModal from "../../../src/components/ExerciseModal";
import { useRouter } from "expo-router";
import { useContributorContext } from "../../../src/contexts/ContributorContext";

export default function VocabularyExercises() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Exercise[]>([]);
  const [progress, setProgress] = useState<UserExercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [exerIndexOnFocus, setExerIndexOnFocus] = useState();
  const [exerIDOnFocus, setExerIDOnFocus] = useState();
  const [exerTopicOnFocus, setExerTopicOnFocus] = useState("");
  const { getUserUUID } = useSession();
  const { isContributor } = useContributorContext();

  const router = useRouter();

  useEffect(() => {
    loadExercises();
  }, []);

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

  const handleExerciseEvent = (exerID, exerTopic, eventType) => {
    {/*Edit to enum later?? This is garbage*/}
    if (eventType == "START") {
      router.push({
        pathname: `exercises/vocabulary/${exerID}`,
      });
    } else if (eventType == "EDIT") {
      router.push({
        pathname: `exercises/vocabulary/${exerID}/edit`,
      });
    }

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
        { isContributor && 
        (<TouchableOpacity onPress={() => router.push({pathname: "/exercises/vocabulary/create"})}>
          <Text style={{color: "aqua", marginTop: 15, fontSize: 18, fontWeight: "900"}}>
            CREATE EXERCISE
          </Text>
        </TouchableOpacity>
        )}
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
          onPress={() => changeExerFocus(result.id, result.topic, index)}
        />
      ))}
    </ScrollView>

    <ExerciseModal 
      userIsContributor={isContributor}
      exerciseTitle={`Vocabulary ${exerIndexOnFocus + 1} - ${exerTopicOnFocus}`} 
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