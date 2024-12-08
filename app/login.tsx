import React, { useEffect, useRef, useState } from "react";
import { Link, router } from "expo-router";
import logo from "../src/assets/icon-backgroundless.png";

import { AppState, StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { supabase } from "../src/utils/supabase";
import { useSession } from "../src/contexts/AuthContext";
import BackgroundCircle from "../src/components/BackgroundCircle";
import Icon from 'react-native-vector-icons/MaterialIcons';

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const greetingTexts = [
  "Welcome back to StoriaTa!",
  "Tara bay, storya na ta!",
  "Balik na kung asa ka ning-biya!"
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const { signIn } = useSession();

  const signin = async () => {
    setLoading(true);
    signIn(email, password);
    setLoading(false);
    router.replace("/");
  };

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

  return (
    <>
    <View style={styles.defaultContainer}>
      <View style={styles.motdContainer}>
        <Image source={logo} style={styles.image}/>
        <Text style={styles.typewriterText}>
          {currentText}
          {showCursor && <Text style={styles.cursor}>|</Text>}
        </Text>
      </View>
      
      <BackgroundCircle size={200} color="white" top={280} left={-45} />
      <BackgroundCircle size={200} color="white" top={310} left={95} />
      <BackgroundCircle size={350} color="white" top={280} left={215} />
 
      <View style={styles.formsContainer}>

        <View>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 2, color: "gray", }}>EMAIL</Text>
          <View style={styles.inputContainer}>
            <Icon name="email" size={24} color="gray" style={{marginRight: 8}} />
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
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 2, color: "gray", }}>PASSWORD</Text>
          <View style={styles.inputContainer}>
            <Icon name="password" size={24} color="gray" style={{marginRight: 8}} />
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

        <View style={{display: "flex", alignItems: "flex-end"}}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: "dodgerblue"}}>Forgot Password</Text>
        </View>

        <TouchableOpacity style={{backgroundColor: "dodgerblue", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 15, elevation: 5 }} onPress={signin}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Log In</Text>
        </TouchableOpacity>

        <View style={{ height: 1, backgroundColor: "lightgray", marginVertical: 15 }} />

        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <Text style={{color: "gray"}}>Don't have an account yet? </Text>
          <Link href="/signup">
            <Text style={{ color:"dodgerblue", fontWeight: "bold"}}>
              Sign up for free!
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
    height: "45%",
    display: "flex",
    paddingBottom: "6%",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "dodgerblue",
  },
  formsContainer: {
    height: "55%",
    width: "100%",
    display: "flex",
    paddingVertical: "5.5%",
    paddingHorizontal: "7.5%",
    gap: 15,
  },
  image: {
    width: "30%",
    height: "30%",
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
    borderColor: 'lightgray',
    borderRadius: 10,
    paddingLeft: 8,
  },
});
