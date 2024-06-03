import { Session } from "@supabase/supabase-js";
import { Button, H5, Paragraph, YStack, Accordion, XStack } from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";
import { useEffect } from "react";
import { Link } from "expo-router";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import Square from "./square";
import cebPHFlag from "../src/assets/pilipinas.png";
import kurozumi from "../src/assets/kurozumi.png";
import BackgroundCircle from "./bg_circles";

export default function Exercises({ session }: { session: Session }) {
  // DO NOT DELETE: FOR TESTING AND INITIALIZATION
  useEffect(() => {
    console.log("EXERCISES page loaded.");
  }, []);

  return (
    <>
      <BackgroundCircle size={300} color="deepskyblue" top={-125} left={-145} />
      <BackgroundCircle size={300} color="deepskyblue" top={-125} left={40} />
      <BackgroundCircle size={300} color="deepskyblue" top={-125} left={215} />
      <View style={styles.headerTitleContainer}>
        <Image source={cebPHFlag} style={styles.flagIcon} />
        <Text style={styles.title}>{"  "}Cebuano Exercises</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>
          How confident are you with your Cebuano? Plunge and take on our
          exercises! Practice makes perfect, does it not?
        </Text>
      </View>

      <ScrollView horizontal={true} contentContainerStyle={styles.container}>
        <Square
          imageSource={kurozumi}
          title="Grammar"
          description="A good grasp of the language's structure can give way to understanding as a whole."
        />
        <Square
          imageSource={kurozumi}
          title="Vocabulary"
          description="What good is comprehension when you don't know what words mean?"
        />
        <Square
          imageSource={kurozumi}
          title="Listening"
          description="Sometimes, simply staying back and listening to things around you can help."
        />
        <Square imageSource={kurozumi} title="Speaking" description="" />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    paddingLeft: "6%",
    paddingRight: "6%",
    flexDirection: "row",
    alignItems: "center",
    height: "15%",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
  flagIcon: {
    width: 50,
    height: 50,
  },
  title: {
    color: "azure",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "azure",
    fontSize: 14,
    paddingLeft: "8%",
    paddingRight: "7%",
    marginTop: -12,
  },
});
