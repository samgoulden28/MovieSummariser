import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

interface Scene {
  scene: string;
  description: string;
}

interface Movie {
  id: string;
  title: string;
  description: string[];
}

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string>('');
  const [selectedScene, setSelectedScene] = useState<string>('');
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [sceneSummaries, setSceneSummaries] = useState<string>('');

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(`${BASE_URL}`);
      setMovies(response.data);
    };
    fetchMovies();
  }, []);

  const handleMovieChange = async (movieId: string) => {
    setSelectedMovie(movieId);
    console.log(movieId);
    try {
      const response = await fetch(`${BASE_URL}/scenes?movie=${movieId}`);
      const scenesResponse = await response.json();
      setScenes(scenesResponse);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(scenes);

  const handleSceneSelect = (scene: string) => {
    setSelectedScene(scene);
    const selectedMovieObj = movies.find((movie) => movie.id === selectedMovie);
    const selectedSceneObj = selectedMovieObj?.scenes.find(
      (sceneObj) => sceneObj.scene === scene
    );
    setSceneSummaries(selectedSceneObj?.summary ?? '');
  };

  const renderItem = ({ item }: { item: Scene }) => (
    <TouchableOpacity onPress={() => handleSceneSelect(item.scene)}>
      <View style={styles.sceneItem}>
        <Text style={styles.sceneNumber}>Scene {item.scene}</Text>
        <Text style={styles.sceneSummary}>{item.summary}</Text>
      </View>
    </TouchableOpacity>
  );

  return movies.length ? (
    <View style={styles.container}>
      <RNPickerSelect
        style={{
          inputIOS: {
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            color: 'black',
            paddingRight: 30, // to ensure the text is never behind the icon
            backgroundColor: '#fff',
          },
          inputAndroid: {
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            color: 'black',
            paddingRight: 30, // to ensure the text is never behind the icon
            backgroundColor: '#fff',
          },
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
        value={selectedMovie}
        onValueChange={(movie) => handleMovieChange(movie)}
        items={movies.map((movie) => ({ label: movie.title, value: movie.id }))}
      />
      <FlatList
        data={movies.find((movie) => movie.id === selectedMovie)?.scenes ?? []}
        renderItem={renderItem}
        keyExtractor={(item) => item.scene}
        style={styles.sceneList}
      />
      {scenes.length ? (
        <View style={styles.summaryContainer}>
          {scenes.map((scene) => (
            <Text style={styles.summaryTitle}>
              Scene {scene.scene_number}: {scene.description}
            </Text>
          ))}
          {/* <TouchableOpacity
            style={styles.generateButton}
            onPress={() => handleSceneSelect(selectedScene)}
          >
            <Text style={styles.buttonText}>Generate Summary</Text>
          </TouchableOpacity> */}
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            Select a movie and scene to view the summary
          </Text>
        </View>
      )}
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 200,
    backgroundColor: '#fff',
  },
  moviePicker: {
    marginBottom: 20,
  },
  sceneList: {
    flex: 1,
    marginBottom: 20,
  },
  sceneItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sceneNumber: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sceneSummary: {
    color: '#666',
  },
  summaryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  summaryText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#ccc',
  },
});

export default App;
