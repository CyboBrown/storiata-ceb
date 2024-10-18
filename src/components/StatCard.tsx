import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";

interface ComponentProps {
  image: ImageSourcePropType;
  title: string;
  value: string;
}

export default function StatCard({image, title, value}: ComponentProps) {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.imageContainer}>
        <Image source={image} style={{width: 50, height: 50}}/>
      </View>
      <View style={styles.statsContainer}>
        <Text style={{color: "black", fontSize: 18, fontWeight: "700"}}>{value}</Text>
        <Text style={{color: "gray", fontSize: 12, fontWeight: "600"}}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: "3%",
    margin: "2.5%",
    borderRadius: 25,
    backgroundColor: "white",
    elevation: 3,
    height: 85,
    flexDirection: "row",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.4,
  },
  statsContainer: {
    flex: 0.6,
    justifyContent: "center",
  },
});