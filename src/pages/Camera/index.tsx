import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';


export default function CameraPage() {

  const camRef = useRef(null);

  const [type, setType] = useState(CameraType.back);

  const[hasPermission, setHaspermission] = useState(null);

  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(()=>{
    (async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHaspermission(status === 'granted');
    })();
  }, []);

  if(hasPermission === null){
    return <View></View>
  }
  if(hasPermission === false){
      return <Text> Acesso negado</Text>
  }
  
  async function takePicture() {
      if(camRef){
          const data = await camRef.current.takePictureAsync();
          setCapturedPhoto(data.uri)
          setOpen(true)
          console.log(data);
      }
  }



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar></StatusBar>
      <Camera style={{flex: 1}} type={type} ref={camRef}>

        <View style={{flex:1, backgroundColor:'trasparent', flexDirection:'row'}}>
        
          <TouchableOpacity style={{position: 'absolute', bottom:20, left:20}}
          onPress={()=>{setType(type === CameraType.back? CameraType.front: CameraType.back)}}>
              <Text style={{fontSize:20, marginBottom:13, color:'#fff'}}>Alternar</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <FontAwesome name='camera' size={23} color="#fff"></FontAwesome>
      </TouchableOpacity>


      {capturedPhoto &&

      <Modal animationType='slide' transparent={false} visible={open}>
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center', margin:20}}>
              <TouchableOpacity style={{margin:10}} onPress={() =>setOpen(false)}>
                  <FontAwesome name='window-close' size={50} color={'#ff0000'}></FontAwesome>
              </TouchableOpacity>
              <Image style={{width:'100%', height:300, borderRadius:20}} source={{uri:capturedPhoto}}></Image>
          </View>
      </Modal>
      
      }

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      
    },
    button:{
      justifyContent: 'center', 
      alignItems:'center',
      backgroundColor: '#121212',
      margin:20,
      borderRadius:10,
      height: 50,
    }
  });
  
