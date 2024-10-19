import { Session } from "@supabase/supabase-js";
import { Button, H5, Paragraph, YStack, Accordion, XStack } from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";
import { useEffect, useLayoutEffect } from "react";
import { Link, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import PHCeb1 from "../../../src/assets/ph_cebu_1.png";
import PHCeb2 from "../../../src/assets/ph_cebu_2.png";
import PHCeb3 from "../../../src/assets/ph_cebu_3.png";
import PHCeb4 from "../../../src/assets/ph_cebu_4.png";
import CustomHeader from "../../../src/components/HeaderTitle";
import ExerciseTypeCard from "../../../src/components/ExerciseTypeCard";

export default function Exercises() {
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CustomHeader pageTitle="Exercises" />, // Use Custom Header
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTintColor: "white",
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>Ready for a language challenge?</Text>
        <Text style={styles.headerSubtitle}>
          Take on the various exercises and challenges on the fundamental areas
          of Cebuano. Practice makes perfect, is it not?
        </Text>
      </View>

      <ScrollView style={styles.exerciseCategoryContainer}>
        <View style={styles.barContainer}>
          <View style={styles.randomHorizontalBar}>
            <Text>{" " /* Please do not ask why this is here. */}</Text>
          </View>
        </View>
        <ExerciseTypeCard
          imageUrl={PHCeb4}
          title="Vocabulary Exercises"
          subtitle="Let's get to know basic everyday things in the Cebuano language!"
          onTextPress={() =>
            router.push({
              pathname: "/exercises/vocabulary",
            })
          }
        />
        <ExerciseTypeCard
          imageUrl={PHCeb3}
          title="Grammar Exercises"
          subtitle="It's time to piece together these words we've learned together into something more meaningful!"
          onTextPress={() =>
            router.push({
              pathname: "/exercises/grammar",
            })
          }
        />
        <ExerciseTypeCard
          imageUrl={PHCeb1}
          title="Listening Exercises"
          subtitle="To be natural at something, sometimes, you have to simply observe and listen."
          onTextPress={() =>
            router.push({
              pathname: "/exercises/listening",
            })
          }
        />
        {/* <ExerciseTypeCard 
          imageUrl={PHCeb2} 
          title="Speaking Exercises" 
          subtitle="Coming soon..."
          onTextPress={() => alert('Speaking exercises coming soon...')}
        /> */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    paddingTop: "8%",
    paddingBottom: "15%",
    justifyContent: "center",
    backgroundColor: "dodgerblue",
  },
  headerTitle: {
    paddingLeft: "6%",
    paddingRight: "6%",
    color: "azure",
    fontSize: 32,
    fontWeight: "bold",
  },
  headerSubtitle: {
    marginTop: "2.5%",
    paddingLeft: "6%",
    paddingRight: "10%",
    color: "azure",
    fontSize: 14,
  },
  exerciseCategoryContainer: {
    padding: "3%",
    marginTop: "-5%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
