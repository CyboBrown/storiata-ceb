import { Session } from "@supabase/supabase-js";
import { Button, H5, Paragraph, YStack, Accordion, XStack } from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";
import { useEffect } from "react";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import BackgroundCircle from "../../src/components/BackgroundCircle";
import SquareItem from "../../src/components/SquareItem";
import PHCebFlag from "../../src/assets/ph_ceb_flag.png";
import PHCeb1 from "../../src/assets/ph_cebu_1.png";
import PHCeb2 from "../../src/assets/ph_cebu_2.png";
import PHCeb3 from "../../src/assets/ph_cebu_3.png";
import PHCeb4 from "../../src/assets/ph_cebu_4.png";

export default function Exercises() {
  const navigator = useNavigation();

  return (
    <>
      <BackgroundCircle size={500} color="dodgerblue" top={-285} left={-150} />
      <BackgroundCircle size={200} color="dodgerblue" top={545} left={60} />
      <BackgroundCircle size={300} color="dodgerblue" top={400} left={200} />
      <View style={styles.headerTitleContainer}>
        <Image source={PHCebFlag} style={styles.flagIcon} />
        <Text style={styles.title}>{"  "}Cebuano Exercises</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>
          How confident are you with your Cebuano? Plunge and take on our
          exercises! Practice makes perfect, does it not?
        </Text>
      </View>

      <ScrollView horizontal={true} contentContainerStyle={styles.container}>
        <Link href="/exercises/grammar" asChild>
          <SquareItem
            imageSource={PHCeb3}
            title="Grammar"
            description="A good grasp of the language's structure can give way to understanding as a whole."
          />
        </Link>

        <Link href="/exercises/vocabulary" asChild>
          <SquareItem
            imageSource={PHCeb4}
            title="Vocabulary"
            description="What good is comprehension when you don't know what words mean?"
          />
        </Link>

        <Link href="/exercises/listening" asChild>
          <SquareItem
            imageSource={PHCeb1}
            title="Listening"
            description="Sometimes, simply staying back and listening to things around you can help."
          />
        </Link>

        <Link href="/exercises/speaking" asChild>
          <SquareItem 
            imageSource={PHCeb2}
            title="Speaking"
            description="It's time to get used to speaking with the locals and get to know them better than before."
          />
        </Link>
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
