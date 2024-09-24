// src/pages/cadastro/Cadastro.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const Cadastro = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        // Perform validation and submission logic here
        if (!name || !email) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        Alert.alert("Success", `Cadastro submitted for ${name}`);
        // Here you could also add functionality to send data to an API, etc.
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
});

export default Cadastro;
