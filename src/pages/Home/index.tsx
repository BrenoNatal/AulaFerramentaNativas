import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
const navigation = useNavigation();
  return (

     <View style={{flex:1, alignItems:'center', justifyContent: 'space-around', flexDirection:'row'}}>

        <Button title='Ver o mapa' onPress={() => navigation.navigate("Location")}></Button>
        <Button title='Tirar foto' onPress={() => navigation.navigate("Camera")}></Button>
     </View>

  );
}