import {ImageBackground ,View,Image, StyleSheet,Text,TouchableOpacity } from 'react-native';
import React from 'react';
import {Feather, FontAwesome} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import Constants from 'expo-constants'
import {RectButton} from 'react-native-gesture-handler';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },
  
  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});


const Detail: React.FC = () => {
  const navigation = useNavigation();

  function handleback(){
    navigation.goBack()
  }

  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity  onPress={handleback}>
        <Feather name="arrow-left" size={20} color='#34cd79' />
      </TouchableOpacity>

      <Image style={styles.pointImage} source={{uri:'https://unsplash.com/photos/kr_88BakygA'}}/>
      <Text style={styles.pointName}>
          Mercadinho do seu zé
      </Text>
      <Text style={styles.pointItems}>
        Oléo de Cozinha, Papelão e Organicaos
      </Text>
      <View style={styles.address}>
          <Text style={styles.addressTitle}>
            Rua da Ata Nº 08, Lima Verde 
          </Text>
          <Text style={styles.addressContent}>
            São Luis, MA
          </Text>
      </View>
    </View>
    <View style={styles.footer}>
      <RectButton style={styles.button}>
        <FontAwesome name="whatsapp" color="#fff" size={20}/>
        <Text style={styles.buttonText}>
            WhatsApp
        </Text>
      </RectButton>
      <RectButton style={styles.button}>
        <Feather name="mail" color="#fff" size={20}/>
        <Text style={styles.buttonText}>
            E-mail
        </Text>
      </RectButton>
    </View>
    </>
    );
}

export default Detail;