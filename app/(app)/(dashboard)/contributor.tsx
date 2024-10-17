import { View, Text, StyleSheet, ScrollView } from "react-native";
import WordStatIcon from "../../../src/assets/contr_stat_word_icon.png";
import ExerStatIcon from "../../../src/assets/contr_stat_exercises_icon.png";
import FavStatIcon from "../../../src/assets/contr_stat_favs_icon.png";
import StatCard from "../../../src/components/StatCard";
import ExerciseCard from "../../../src/components/ExerciseCard";

export default function ContributorDashboard() {
  return (
    <ScrollView>
      <View style={{marginTop: "2.5%", marginBottom: "1.5%", paddingLeft: "4.5%", paddingRight: "4.5%"}}>
        <Text style={{fontSize: 21, fontWeight: "800", color: "gray"}}>Statistics</Text>
      </View>
      <View style={styles.statisticsContainer}>
        <View style={styles.leftColumn}>
          <StatCard image={WordStatIcon} title="Words Contributed" value="0"/>
          <StatCard image={ExerStatIcon} title="Exercises Contributed" value="99"/>
        </View>
        <View style={styles.rightColumn}>
          <StatCard image={FavStatIcon} title="Future Stats" value="99"/>
          <StatCard image={FavStatIcon} title="Future Stats" value="99"/>
        </View>
      </View>

      <View style={{marginTop: "2.5%", paddingLeft: "4.5%", paddingRight: "4.5%"}}>
        <Text style={{fontSize: 21, fontWeight: "800", color: "gray"}}>Recently Contributed Words</Text>
      </View>
      <View style={styles.scrollContainerWrapper}>
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.recentWordsScrollContainer}
        >
          <View style={styles.wordItem}>
            <Text style={{fontSize: 64, marginBottom: 20}}>🧨</Text>
            <Text style={{fontSize: 24, color: "gray", fontWeight: "900"}}>Pabuto</Text>
          </View>
          <View style={styles.wordItem}>
            <Text style={{fontSize: 64, marginBottom: 20}}>🧨</Text>
            <Text style={{fontSize: 24, color: "gray", fontWeight: "900"}}>Pabuto</Text>
          </View>
          <View style={styles.wordItem}>
            <Text style={{fontSize: 64, marginBottom: 20}}>🧨</Text>
            <Text style={{fontSize: 24, color: "gray", fontWeight: "900"}}>Pabuto</Text>
          </View>
          <View style={styles.wordItem}>
            <Text style={{fontSize: 64, marginBottom: 20}}>🧨</Text>
            <Text style={{fontSize: 24, color: "gray", fontWeight: "900"}}>Pabuto</Text>
          </View>
          <View style={styles.wordItem}>
            <Text style={{fontSize: 64, marginBottom: 20}}>🧨</Text>
            <Text style={{fontSize: 24, color: "gray", fontWeight: "900"}}>Pabuto</Text>
          </View>
        </ScrollView>
      </View>

      <View style={{marginTop: "2.5%", marginBottom: "1.5%", paddingLeft: "4.5%", paddingRight: "4.5%"}}>
        <Text style={{fontSize: 21, fontWeight: "800", color: "gray"}}>Recently Contributed Exercises</Text>
      </View>
      <ScrollView style={styles.recentExercisesContainer}>
        <ExerciseCard
          title="SAMPLE EXERCISE"
          subtitle="I don't know, I just got here."
        />
        <ExerciseCard
          title="SAMPLE EXERCISE"
          subtitle="I don't know, I just got here."
        />
        <ExerciseCard
          title="SAMPLE EXERCISE"
          subtitle="I don't know, I just got here."
        />
        <ExerciseCard
          title="SAMPLE EXERCISE"
          subtitle="I don't know, I just got here."
        />
        <ExerciseCard
          title="SAMPLE EXERCISE"
          subtitle="I don't know, I just got here."
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
    justifyContent: 'center',
  },
  wordItem: {
    width: 150,
    height: 175,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  recentExercisesContainer: {
    padding: "3.5%"
  }
});
