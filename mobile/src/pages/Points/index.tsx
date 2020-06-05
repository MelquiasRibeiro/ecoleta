import React,{useEffect,useState} from 'react';
import {Alert,TouchableOpacity ,View,Image, StyleSheet,Text, ScrollView, } from 'react-native';
import Constants from 'expo-constants';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import MapViwe,{Marker} from 'react-native-maps';
import  {SvgUri} from  'react-native-svg';
import * as Location from 'expo-location';
import api from '../../services/api';


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

interface Item {
  id: number;
  title: string;
  imageurl: string;
}
interface Point{
  id:number;
  name:string;
  image:string;
  latitude:number;
  longitude:number;

}

const Points: React.FC = () => {
  const [points,setPoints] = useState<Point[]>([])
  const [itens,setItens] = useState<Item[]>([])
  const [selectedItens,setSelectedItens] =useState<number[]>([])
  const [initialPosition,setInitialPosition] =useState<[number,number]>([0,0])


  const navigation = useNavigation();

  function handleback(){
    navigation.goBack()
  }

  function handleNavigateToDetails(id:number){
    navigation.navigate('Details',{point_id:id})
  }
  
  useEffect(() => {
      api.get('/itens').then(response =>{
        setItens(response.data)
      })
  }, [])

  useEffect(() => {
    async function loadPosition(){
      const {status} = await Location.requestPermissionsAsync()  
      if(status !== 'granted'){
        Alert.alert('Ooops...',"Precisamos da sua localização")
      }

      const location = await Location.getCurrentPositionAsync();
      const {latitude,longitude} = location.coords
      setInitialPosition([latitude,longitude])
    }
    loadPosition()
  }, [])
    useEffect(() => {
     api.get('/point',{
       params:{
         city: "São José dos Basílios",
         uf:"MA",
         itens: [1],
       }
     }).then(respose=>{
       setPoints(respose.data)
     })
    }, [])

  function handleSelectItem(id:number){
    const alredySelected = selectedItens.findIndex(item =>item ===id)
    
    if(alredySelected >=0){
       const filteredItens = selectedItens.filter(item => item !== id);
       setSelectedItens(filteredItens);
   }else{
        setSelectedItens([...selectedItens,id])
    }

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
        {initialPosition[0]!==0 && (<MapViwe 
          style={styles.map} 
          initialRegion={{ 
            latitude: initialPosition[0], 
            longitude: initialPosition[1], 
            latitudeDelta:0.014,
            longitudeDelta:0.014,
            }}>
         {points.map(point=>( 
         <Marker 
          key={point.id}
          style={styles.mapMarker}
          coordinate={{
            latitude: point.latitude, 
            longitude: point.longitude
            }}
          onPress={()=>handleNavigateToDetails(point.id)}
            >
          <View style={styles.mapMarkerContainer}>
              <Image 
              style={styles.mapMarkerImage}
              source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}/>
              <Text style={styles.mapMarkerTitle}>
                 {point.name}
              </Text>
          </View>    
          </Marker>))}
        </MapViwe>)}
      </View>
    </View>
    <View style={styles.itemsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
        paddingHorizontal:16
      }}>
        {itens.map(item=>(
           <TouchableOpacity 
           onPress={()=>handleSelectItem(item.id)} 
           style={selectedItens.includes(item.id)? [styles.item, styles.selectedItem] :styles.item } 
           key={String(item.id)}
           activeOpacity={0.7}
           >
           <SvgUri width={42} height={42} uri={item.imageurl}/>
           <Text style={styles.itemTitle}>
             {item.title}
           </Text>
         </TouchableOpacity>
        ))
         }
      </ScrollView>
    </View>
    </>
  );
}

export default Points;