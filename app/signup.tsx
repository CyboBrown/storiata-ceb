import React, { useEffect, useState } from "react";
import { UserAuthentication } from "../src/services/UserAuthentication";
import { Session, User } from "@supabase/supabase-js";
import logo from "../src/assets/icon-backgroundless.png";

import {
  useColorScheme,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Check } from "@tamagui/lucide-icons";
import { Link, router } from "expo-router";
import BackgroundCircle from "../src/components/BackgroundCircle";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Checkbox } from "tamagui";

const greetingTexts = [
  "Welcome to StoriaTa!",
  "Tara bay, storya na ta!",
  "Andam ka na ba, bay?",
];

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isContributor, setIsContributor] = useState(false);
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session>();

  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = greetingTexts[currentIndex];

      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1));
      } else {
        setCurrentText(fullText.slice(0, typingIndex + 1));
      }

      setTypingIndex((prev) => (isDeleting ? prev - 1 : prev + 1));

      if (!isDeleting && typingIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 750);
      } else if (isDeleting && typingIndex === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % greetingTexts.length);
      }
    };

    const typingInterval = setInterval(handleTyping, 75);
    return () => clearInterval(typingInterval);
  }, [typingIndex, isDeleting, currentIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const signup = async () => {
    setLoading(true);
    const result = UserAuthentication.checkPassword(password, confirmPassword);
    result ? "" : alert("Password not correct");
    const data: any = await UserAuthentication.signUpWithEmail(email, password);
    if (data?.user?.id && isContributor) {
      UserAuthentication.requestContributor(data.user.id);
    }
    setLoading(false);
    router.push("/");
  };

  const handleContributorChange = () => {
    setIsContributor(!isContributor);
  };

  return (
    <>
      <View style={styles.defaultContainer}>
        <View style={styles.motdContainer}>
          <Image source={logo} style={styles.image} />
          <Text style={styles.typewriterText}>
            {currentText}
            {showCursor && <Text style={styles.cursor}>|</Text>}
          </Text>
        </View>

        <BackgroundCircle size={200} color="white" top={"26%"} left={-45} />
        <BackgroundCircle size={200} color="white" top={"30%"} left={95} />
        <BackgroundCircle size={350} color="white" top={"26%"} left={215} />

        <View style={styles.formsContainer}>
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginBottom: 2,
                color: "gray",
              }}
            >
              FULL NAME
            </Text>
            <View style={styles.inputContainer}>
              <Icon
                name="account-circle"
                size={24}
                color="gray"
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={{ flex: 1, height: 45, paddingLeft: 5, color: "gray" }}
                value={fullname}
                onChangeText={setFullname}
                placeholder="Enter your full name.."
                editable={true}
                autoCorrect={false}
                spellCheck={false}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginBottom: 2,
                color: "gray",
              }}
            >
              USERNAME
            </Text>
            <View style={styles.inputContainer}>
              <Icon
                name="alternate-email"
                size={24}
                color="gray"
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={{ flex: 1, height: 45, paddingLeft: 5, color: "gray" }}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username..."
                editable={true}
                autoCorrect={false}
                spellCheck={false}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginBottom: 2,
                color: "gray",
              }}
            >
              EMAIL
            </Text>
            <View style={styles.inputContainer}>
              <Icon
                name="email"
                size={24}
                color="gray"
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={{ flex: 1, height: 45, paddingLeft: 5, color: "gray" }}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address..."
                editable={true}
                autoCorrect={false}
                spellCheck={false}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginBottom: 2,
                color: "gray",
              }}
            >
              PASSWORD
            </Text>
            <View style={styles.inputContainer}>
              <Icon
                name="password"
                size={24}
                color="gray"
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={{ flex: 1, height: 45, paddingLeft: 5, color: "gray" }}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password..."
                editable={true}
                autoCorrect={false}
                spellCheck={false}
                autoCapitalize="none"
                secureTextEntry
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginBottom: 2,
                color: "gray",
              }}
            >
              CONFIRM PASSWORD
            </Text>
            <View style={styles.inputContainer}>
              <Icon
                name="password"
                size={24}
                color="gray"
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={{ flex: 1, height: 45, paddingLeft: 5, color: "gray" }}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Enter your password again to confirm..."
                editable={true}
                autoCorrect={false}
                spellCheck={false}
                autoCapitalize="none"
                secureTextEntry
              />
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 10,
              gap: 10,
            }}
          >
            <Checkbox
              size="$5"
              checked={isContributor}
              onPress={() => handleContributorChange()}
              backgroundColor={"white"}
            >
              <Checkbox.Indicator>
                <Check color={"black"} />
              </Checkbox.Indicator>
            </Checkbox>
            <Text style={{ color: "gray", fontWeight: "bold" }}>
              Register as contributor
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "dodgerblue",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 15,
              elevation: 5,
            }}
            onPress={signup}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "gray" }}>Already have an account? </Text>
            <Link href="/">
              <Text style={{ color: "dodgerblue", fontWeight: "bold" }}>
                {" "}
                Log in now!
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  motdContainer: {
    height: "35%",
    display: "flex",
    paddingBottom: "5%",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "dodgerblue",
  },
  formsContainer: {
    height: "65%",
    width: "100%",
    display: "flex",
    paddingHorizontal: "7.5%",
    gap: 5,
  },
  image: {
    width: "40%",
    height: "40%",
    resizeMode: "contain",
  },
  typewriterText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cursor: {
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    paddingLeft: 8,
  },
});
