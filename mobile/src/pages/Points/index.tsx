import React from 'react';
import {TouchableOpacity ,View,Image, StyleSheet,Text, ScrollView, } from 'react-native';
import Constants from 'expo-constants'
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import MapViwe,{Marker} from 'react-native-maps';
import  {SvgUri} from  'react-native-svg'
const styles = StyleSheet.create({
   container: {
     flex: 1,
     paddingHorizontal: 32,
     paddingTop: 20 + Constants.statusBarHeight,
   },

   title: {
     fontSize: 20,
     fontFamily: 'Ubuntu_700Bold',
     marginTop: 24,
   },

   description: {
     color: '#6C6C80',
     fontSize: 16,
     marginTop: 4,
     fontFamily: 'Roboto_400Regular',
   },

   mapContainer: {
     flex: 1,
     width: '100%',
     borderRadius: 10,
     overflow: 'hidden',
     marginTop: 16,
   },

   map: {
     width: '100%',
     height: '100%',
   },

   mapMarker: {
     width: 90,
     height: 80, 
   },

   mapMarkerContainer: {
     width: 90,
     height: 70,
     backgroundColor: '#34CB79',
     flexDirection: 'column',
     borderRadius: 8,
     overflow: 'hidden',
     alignItems: 'center'
   },

   mapMarkerImage: {
     width: 90,
     height: 45,
     resizeMode: 'cover',
   },

   mapMarkerTitle: {
     flex: 1,
     fontFamily: 'Roboto_400Regular',
     color: '#FFF',
     fontSize: 13,
     lineHeight: 23,
   },

   itemsContainer: {
     flexDirection: 'row',
     marginTop: 16,
     marginBottom: 32,
   },

   item: {
     backgroundColor: '#fff',
     borderWidth: 2,
     borderColor: '#eee',
     height: 120,
     width: 120,
     borderRadius: 8,
     paddingHorizontal: 16,
     paddingTop: 20,
     paddingBottom: 16,
     marginRight: 8,
     alignItems: 'center',
     justifyContent: 'space-between',

     textAlign: 'center',
   },

   selectedItem: {
     borderColor: '#34CB79',
     borderWidth: 2,
   },

   itemTitle: {
     fontFamily: 'Roboto_400Regular',
     textAlign: 'center',
     fontSize: 13,
   },
 });

const Points: React.FC = () => {
  const navigation = useNavigation();

  function handleback(){
    navigation.goBack()
  }

  function handleNavigateToDetails(){
    navigation.navigate('Details')
  }
  
  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity  onPress={handleback}>
       <Feather name="arrow-left" size={20} color='#34cd79' />
      </TouchableOpacity>
    <Text style={styles.title}>
      Bem vindo
    </Text>
    <Text style={styles.description}>
      Encontre no mapa um ponto de coleta.
    </Text>
      <View style={styles.mapContainer}>
        <MapViwe 
          style={styles.map} 
          initialRegion={{ 
            latitude: -2.4989315, 
            longitude: -44.1934806, 
            latitudeDelta:0.014,
            longitudeDelta:0.014,
            }}>
          <Marker 
          style={styles.mapMarker}
          coordinate={{
            latitude: -2.4989315, 
            longitude: -44.1934806
            }}
          onPress={handleNavigateToDetails}
            >
          <View style={styles.mapMarkerContainer}>
              <Image 
              style={styles.mapMarkerImage}
              source={{uri:'https://unsplash.com/photos/kr_88BakygA'}}/>
              <Text style={styles.mapMarkerTitle}>
                  Mercadinho
              </Text>
          </View>    
          </Marker>
        </MapViwe>
      </View>
    </View>
    <View style={styles.itemsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
        paddingHorizontal:16
      }}>
        <TouchableOpacity style={styles.item} onPress={()=>{}}>
          <SvgUri width={42} height={42} uri="http://10.0.0.105:3333/uploads/lampadas.svg"/>
          <Text style={styles.itemTitle}>
            Lampada
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={()=>{}}>
          <SvgUri width={42} height={42} uri="http://10.0.0.105:3333/uploads/lampadas.svg"/>
          <Text style={styles.itemTitle}>
            Lampada
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={()=>{}}>
          <SvgUri width={42} height={42} uri="http://10.0.0.105:3333/uploads/lampadas.svg"/>
          <Text style={styles.itemTitle}>
            Lampada
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={()=>{}}>
          <SvgUri width={42} height={42} uri="http://10.0.0.105:3333/uploads/lampadas.svg"/>
          <Text style={styles.itemTitle}>
            Lampada
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    </>
  );
}

export default Points;