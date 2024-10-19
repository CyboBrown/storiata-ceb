import { green, redDark } from "@tamagui/themes";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Progress } from "tamagui";

interface ComponentProps {
  title: string;
  subtitle: string;
  progress: number;
  onPress: any;
  hideProgress?: boolean;
  isAdd?: boolean;
}

export default function ExerciseCard({
  title,
  subtitle,
  progress,
  onPress,
  hideProgress,
  isAdd,
}: ComponentProps) {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.iconContainer}>
            <Icon name={isAdd ? "plus" : "book"} size={50} color="gray" />
          </View>

          <View style={styles.rightContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <Icon
            name="chevron-right"
            size={30}
            color="gray"
            style={styles.arrow}
          />
        </View>

        {!hideProgress && (
          <View style={styles.progressContainer}>
            <View
              style={{ flex: 0.2, flexDirection: "row", alignItems: "center" }}
            >
              <Icon name="star-circle" size={15} color="dodgerblue" />
              <Text style={{ color: "gray", fontWeight: "700" }}>
                {" "}
                {progress >= 6 ? "6" : progress.toString()}/6{" "}
              </Text>
            </View>

            <View style={{ flex: 0.8 }}>
              <Progress
                size="$1.5"
                value={progress > 100 ? 100 : (100 / 6) * progress}
                width="100%"
                alignSelf="center"
              >
                <Progress.Indicator
                  backgroundColor={"$blue8"}
                  animation="bouncy"
                />
              </Progress>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
    padding: 6,
    marginBottom: 10,
    marginLeft: "1.25%",
    marginRight: "1.25%",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressContainer: {
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 15,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
  arrow: {
    marginLeft: 10,
  },
});
