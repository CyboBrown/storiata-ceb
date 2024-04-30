import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, SizableText } from "tamagui";
import { userAuthentication } from "../viewmodels/UserAuthentication";

export default function Login() {
    const { email, setEmail, password, setPassword, loading, signInWithEmail } = userAuthentication();

    return (
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <SizableText fontFamily="$body" color="black"> Email </SizableText>
                <Input
                    size="$4"
                    placeholder="email@gmail.com"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={[styles.verticallySpaced]}>
                <SizableText fontFamily="$body" color="black"> Password </SizableText>
                <Input
                    size="$4"
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button size="$4" disabled={loading} onPress={signInWithEmail}>Sign in</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: "stretch",
    },
    mt20: {
        marginTop: 20,
    },
});