import React,{useState,useEffect, ChangeEvent, FormEvent} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet'
import {LeafletMouseEvent} from 'leaflet'
import{FiArrowLeft} from 'react-icons/fi'
import axios from 'axios';

import './style.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import Dropzone from '../../components/Dropzone/index';

interface Item{
    id:number;
    title:string;
    imageurl:string;
}
interface IBGEUFResponse{
    sigla:string;
}

interface IBGECityResponse{
    nome:string;
}

const RegisterPoint:React.FC = () => {
    
    const [itens,setItens]=useState<Item[]>([]);
    const [erro,setError] = useState()
    const [uf,setUf]=useState<string[]>([]);
    const [city,setCity]=useState<string[]>([])
    const [selectedUf,setSelectedUf]=useState('0');
    const [selectedCity,setSelectedCity]=useState('0');
    const [selectedPosition,setSelectedPosition] = useState<[number,number]>([0,0])
    const [currentPosition,setCurrentPosition] = useState<[number,number]>([0,0])
    const [formData,setFormData]= useState({
        name:'',
        email:'',
        whatsapp:'',
    })
    const [selectedItens,setSelectedItens]=useState<number[]>([])
    const [selectedFile,setSelectedFile] = useState<File>();
    
    const history = useHistory();
    
    
    //get initial position
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(position=>{
          const {latitude,longitude} =position.coords
          setCurrentPosition([latitude,longitude])

      })
    }, [])

    
    //get item images
    useEffect(() => {
        api.get('/itens').then(response =>{
            setItens(response.data)
        }  
        )
        .catch(error=>{
            setError(error)
            console.log(erro)
        }        
        )
    }, [erro])

    
    //get UFs
    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response=>{
            const initials = response.data.map(uf => uf.sigla);
            setUf(initials);
        }).catch(error=>{
            setError(error)
            console.log(erro)
        })

    }, [erro])

    
    //get selected UF
    function handleSelectUf(e:ChangeEvent<HTMLSelectElement>){
        setSelectedUf(e.target.value)
    }

    
    //get values from text inputs
    function handleInputChange(e:ChangeEvent<HTMLInputElement>){
        const {name,value} = e.target;
        console.log(name,value)
        setFormData({...formData,[name]:value})

    }

    
    //control selected itens
    function handleSelectItem(id:number){
     const alredySelected = selectedItens.findIndex(item =>item ===id)
     
     if(alredySelected >=0){
        const filteredItens = selectedItens.filter(item => item !== id);
        setSelectedItens(filteredItens);
    }else{
         setSelectedItens([...selectedItens,id])
     }

    }

    
    //get cities 
    useEffect(() => {
        
    if(selectedUf === '0'){
        return
    }
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response=>{
          const cityName = response.data.map(city=>(
               city.nome
           ))
           setCity(cityName);
    }).catch(error=>{
         setError(error)
         console.log(erro)
     })
    }, [erro, selectedUf])


    //get selected city
    function handleSelectCity(e:ChangeEvent<HTMLSelectElement>){
        setSelectedCity(e.target.value)
    }


    //get position selected
    function handleMapClick(e:LeafletMouseEvent){
        setSelectedPosition([e.latlng.lat,e.latlng.lng])
    }


    //post to api to register
    async function handleRegister(e:FormEvent){
        e.preventDefault();

        const {name,whatsapp,email} = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude,longitude ] = selectedPosition;
        const itens = selectedItens;

        const data = new FormData(); 
        
            data.append('name', name);
            data.append('email', email);
            data.append('whatsapp', whatsapp);
            data.append('latitude', String(latitude));
            data.append('longitude', String(longitude));
            data.append('city', city);
            data.append('uf', uf);
            data.append('itens', itens.join(','));
            if(selectedFile){
                data.append('image',selectedFile )
            }
        
        await api.post('/point',data)
        alert('Pronto, criei')
        history.push('/')
    }



    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to="/" >
                    <FiArrowLeft/>
                    Volltar para home
                </Link>
            </header>
            <form 
            onSubmit={handleRegister}>
                <h1>Cadastro do <br/>
                    ponto de coleta
                </h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                        <label >           
                        Imagem
                        </label>
                       <Dropzone onFileUploaded={setSelectedFile}/>
                    <div className="field">
                        <label htmlFor="name">           
                        Nome da entidade
                        </label>
                        <input 
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                    <div className="field-group">
                    <div className="field">
                        <label htmlFor="email">           
                        E-mail
                        </label>
                        <input 
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="whatsapp">           
                            Whatsapp
                        </label>
                        <input 
                        type="text"
                        name="whatsapp"
                        id="whatsapp"
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>selecione seu endereço no mapa</span>
                    </legend>
                    <Map  
                    center={currentPosition}
                    zoom={15} 
                    onclick={handleMapClick}>
                        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <Marker 
                        position={selectedPosition}/>
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">
                                Estado (UF)
                            </label>
                            <select className="uf" value={selectedUf} id="uf" onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {uf.map(uf=>(
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">
                                Cidade
                            </label>
                           {selectedUf !== '0' ? <select className="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                                <option value="0">Selecione uma cidade</option>
                                {
                                    city.map(city=>(
                                    <option key={city}value={city} >{city}</option>
                                    ))
                                }
                            </select>: <span>Selecione sua <b>UF</b> primeiro </span>}
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <samp>selecione um ou mais intens abaixo</samp>
                    </legend>
                    <ul className="items-grid">
                        {
                    itens.map(item=>(
                        <li className={selectedItens.includes(item.id)? 'selected':'' }
                            key={item.id} 
                            onClick={()=>handleSelectItem(item.id)}>
                            <img src={item.imageurl} alt={item.title}/>
                            <span>{item.title}</span>
                        </li>
                    ))
                        }
                    </ul>
                </fieldset>
                <button type="submit">
                    Castrar ponto de coleta
                </button>
            </form>
        </div>
    )
}
export default RegisterPoint;