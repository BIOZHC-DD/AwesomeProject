/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useState} from 'react';
import {Button, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {convertToRGB} from 'react-native-image-to-rgb';
import * as ImageManipulator from 'expo-image-manipulator';
import { manipulateAsync } from 'expo-image-manipulator';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

import {useTensorflowModel} from 'react-native-fast-tflite';

function Section({children, title}: SectionProps): React.JSX.Element {
  const tf = useTensorflowModel(
    require('./assets/east-text-detector-tflite-dr-v1.tflite'),
  );
  //const car = tf.state;
  //const ccar = tf.model;

  const car = 'caw';
  const ccar = 'crow';

  console.log(tf.state);
  console.log(tf.model);
  const isDarkMode = useColorScheme() === 'dark';

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    //console.log("go goa gone");
    //console.log(rgbArray);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      //   console.log("go pune puni");
    }
    //  const rgbArray = await convertToRGB(result.assets[0].uri);
    //   console.log(rgbArray);

    //    const resulter = await convertToRGB();
    //
    //
    //
    //

    const resized = await manipulateAsync(
                result.assets[0].uri,
                [{ resize: { height: 320, width: 320 } }],
                { base64: true }
            )
            const convertedArray = await convertToRGB(resized.uri)
            console.log("convertedArray length");
            console.log(convertedArray.length);
            //console.log(convertedArray);
            const arrayBuffer = new Uint8Array(convertedArray)
            console.log("arrayBuffer length");
            console.log(arrayBuffer.length);
            //console.log(arrayBuffer);
            const resultt = await tf.model?.runSync([arrayBuffer])
            //console.log("yeh ai ahia ahiaiaiaa ahia");
            //console.log(resultt?.length);
            //console.log(resultt[resultt.length - 1]);
            //console.log(Array.isArray(resultt));
            //console.log(typeof resultt);
            //console.log(Array.isArray(resultt.tensor));
            //console.log(JSON.stringify(resultt, null, 2));
            //console.log("jheen tapak dum dum");
            //console.log(resultt.constructor.name);
            //
            //

            //console.log(resultt);
            

            console.log("resultt length");
            
//            console.log(resultt?.length);
            console.log(resultt[0]?.length);
            console.log(resultt[1]?.length);
            //console.log(resultt);
            //
            //
            console.log(resultt[0][0]);
            console.log(resultt[0][1]);
            console.log(resultt[0][2]);
            console.log(resultt[0][3]);
            console.log(resultt[0][4]);
            console.log(resultt[0][5]);
            console.log(resultt[0][6]);


     };

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text>TensorFlow State: {JSON.stringify(car)}</Text>
      <Text>TensorFlow Model: {JSON.stringify(ccar)}</Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
      <View style={styles.container}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{uri: image}} style={styles.image} />}
      </View>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default App;
