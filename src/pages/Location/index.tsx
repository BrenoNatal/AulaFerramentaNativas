import { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar, Modal, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';



export default function LocationPage() {

    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<any>(null);
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permissão negada');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
  
    useEffect(() => {
     if(location){
       Location.reverseGeocodeAsync(location.coords).then((data)=>{
          alert(
            `Cara!! como você veio parar aqui no estado do(a) ${data[0].region} na Cidade do(a) ${data[0].subregion}.${"\n\n"} Nesse país que é o(a) ${data[0].country}.`
          )
       })
       setOpen(true)
     }
    }, [location]);

    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
                {location && (
                    <Marker coordinate={{
                        latitude: location["coords"]["latitude"],
                        longitude: location["coords"]["longitude"]
                    }}
                    onDragEnd={(data) =>{
                        setLocation({
                            coords:{
                                latitude: data.nativeEvent.coordinate.latitude,
                                longitude: data.nativeEvent.coordinate.longitude,
                            }
                        });
                    }}
                    draggable />
                )
                }
            </MapView>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    map:{
      width: "100%",
      height: "100%",
      flex:1
    }
  });
