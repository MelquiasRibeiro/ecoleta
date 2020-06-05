import React,{useEffect,useState} from 'react';
import {AppLoading} from 'expo';
import {Feather} from '@expo/vector-icons';
import {TextInput,ImageBackground ,View,Image, StyleSheet,Text,KeyboardAvoidingView,Platform } from 'react-native';
import {Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto'
import {Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu'
import {RectButton} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'
import axios from 'axios'


const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 32,
   },

   main: {
     flex: 1,
     justifyContent: 'center',
   },

   title: {
     color: '#322153',
     fontSize: 32,
     fontFamily: 'Ubuntu_700Bold',
     maxWidth: 260,
     marginTop: 64,
   },

   description: {
     color: '#6C6C80',
     fontSize: 16,
     marginTop: 16,
     fontFamily: 'Roboto_400Regular',
     maxWidth: 260,
     lineHeight: 24,
   },

   footer: {},

   select: {},

   input: {
     height: 60,
     backgroundColor: '#FFF',
     borderRadius: 10,
     marginBottom: 8,
     paddingHorizontal: 24,
     fontSize: 16,
   },

   button: {
     backgroundColor: '#34CB79',
     height: 60,
     flexDirection: 'row',
     borderRadius: 10,
     overflow: 'hidden',
     alignItems: 'center',
     marginTop: 8,
   },

   buttonIcon: {
     height: 60,
     width: 60,
     backgroundColor: 'rgba(0, 0, 0, 0.1)',
     justifyContent: 'center',
     alignItems: 'center'
   },

   buttonText: {
     flex: 1,
     justifyContent: 'center',
     textAlign: 'center',
     color: '#FFF',
     fontFamily: 'Roboto_500Medium',
     fontSize: 16,
   }
 });

 interface IBGEUFResponse{
  sigla:string;
}

interface IBGECityResponse{
  nome:string;
}


const Home: React.FC= () => {
  const [uf,setUf]=useState('');
  const [city,setCity]=useState('');
  //const [selectedUf,setSelectedUf]=useState('0');
  //const [selectedCity,setSelectedCity]=useState('0');
  const navigation = useNavigation();

//   useEffect(() => {
//     axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response=>{
//         const initials = response.data.map(uf => uf.sigla);
//         setUf(initials);
//     })

//   }, [])

//   useEffect(() => {
        
//   if(selectedUf === '0'){
//       return
//   }

//   axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response=>{
//         const cityName = response.data.map(city=>(
//              city.nome
//          ))
//          setCity(cityName);
//   })
//   }, [selectedUf])

//   function handleSelectUf(e:ChangeEvent<HTMLSelectElement>){
//       setSelectedUf(e.target.value)
//   }
//   function handleSelectCity(e:ChangeEvent<HTMLSelectElement>){
//     setSelectedCity(e.target.value)
// }
  
  function handleNavigateToPoints(){
    navigation.navigate('Points',{
      uf,
      city
    })
  }
  
  const [fontsLoaded] =useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  })
  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <KeyboardAvoidingView  style={{flex:1}} behavior={Platform.OS==='ios'?'padding': undefined}>
    <ImageBackground
    imageStyle={{width:274, height:368 }} 
    source={require('../../assets/home-background.png')} 
    style={styles.container}>
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')}/>
        <View>
          <Text style={styles.title}>
            Seu marketplace de coleta de resíduos
          </Text>
          <Text style={styles.description}>
            Ajudamos pessoas a encontrar pontos de coleta de foma eficienete.
          </Text>
        </View>

      </View>
      <View style={styles.footer}>
        <TextInput style={styles.input} 
        placeholder="Digite a UF" 
        maxLength={2} 
        autoCapitalize="characters"
        autoCorrect={false}
        value={uf}
        onChangeText={setUf}/>
        <TextInput 
        style={styles.input} 
        placeholder="Digite a cidade" 
        value={city}
        onChangeText={setCity}/>
        <RectButton style={styles.button}onPress={handleNavigateToPoints} >
          <View style={styles.buttonIcon}>
            <Feather name="arrow-right" color="#ffff" size={24}/>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default Home;