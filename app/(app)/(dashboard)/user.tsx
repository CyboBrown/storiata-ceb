import { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Exercise } from "../../../src/models/Exercise";
import { ExerciseService } from "../../../src/services/ExerciseService";
import { useSession } from "../../../src/contexts/AuthContext";
import StatCard from "../../../src/components/StatCard";
import WordStatIcon from "../../../src/assets/contr_stat_word_icon.png";
import ExerStatIcon from "../../../src/assets/contr_stat_exercises_icon.png";
import ExerciseCard from "../../../src/components/ExerciseCard";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Dashboard() {
  const [results, setResults] = useState<Exercise[]>([]);
  const [exerCompleted, setExerCompleted] = useState(0);
  const [wordsMistaken, setWordsMistaken] = useState(0);
  const { getUserUUID } = useSession();
  
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {

  }, []);


  return (
    <ScrollView>
      <View style={{marginTop: "2.5%", marginBottom: "1.5%", paddingLeft: "4.5%", paddingRight: "4.5%"}}>
        <Text style={{fontSize: 21, fontWeight: "800", color: "gray"}}>Statistics</Text>
      </View>

      <View style={styles.statisticsContainer}>
        <View style={styles.leftColumn}>
          <StatCard image={WordStatIcon} title="Exercises Completed" value={exerCompleted.toString()}/>

        </View>
        <View style={styles.rightColumn}>
          <StatCard image={ExerStatIcon} title="Future Statistics" value="99"/>
        </View>
      </View>
      <TouchableOpacity>
        <View style={styles.mistakenWordsButton}>
          <Icon name="clipboard-text-search-outline" size={24} color="gray" />
          <Text style={{color: "gray", fontWeight: "700"}}>{"  "}View All Mistaken Words</Text>
        </View>
      </TouchableOpacity>

      <View style={{marginTop: "2.5%", paddingLeft: "4.5%", paddingRight: "4.5%"}}>
        <Text style={{fontSize: 21, fontWeight: "800", color: "gray"}}>Resume Unfinished Exercises</Text>
      </View>
      <View style={{padding: "3.5%"}}>
        <ExerciseCard
          title="SAMPLE EXERCISE"
          subtitle="I don't know, I just got here."
          progress={5}
        />
        <ExerciseCard
          title="SAMPLE EXERCISE"
          subtitle="I don't know, I just got here."
          progress={5}
        />
        <ExerciseCard
          title="SAMPLE EXERCISE"
          subtitle="I don't know, I just got here."
          progress={3}
        />
        <ExerciseCard
          title="SAMPLE EXERCISE"
          subtitle="I don't know, I just got here."
          progress={2}
        />
        <ExerciseCard
          title="SAMPLE EXERCISE"
          subtitle="I don't know, I just got here."
          progress={1}
        />
      </View>
    </ScrollView>
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
  }
});