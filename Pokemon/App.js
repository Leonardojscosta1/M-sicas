import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Image, Alert } from 'react-native';

export default function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  const fetchPokemon = async () => {
    if (!pokemonName) {
      Alert.alert("Por favor, insira o nome de um Pokémon!");
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon não encontrado");
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      Alert.alert("Erro", error.message);
      setPokemonData(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do Pokémon"
        value={pokemonName}
        onChangeText={setPokemonName}
      />
      <Button title="Buscar Pokémon" onPress={fetchPokemon} />
      {pokemonData && (
        <View style={styles.pokemonContainer}>
          <Text style={styles.pokemonName}>{pokemonData.name.toUpperCase()}</Text>
          <Image
            source={{ uri: pokemonData.sprites.front_default }}
            style={styles.pokemonImage}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
  },
  pokemonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
});
