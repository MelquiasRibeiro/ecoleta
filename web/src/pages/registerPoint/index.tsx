import React from 'react'
import './style.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import{FiArrowLeft} from 'react-icons/fi'
const RegisterPoint:React.FC = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to="/" ><FiArrowLeft/>Volltar para home</Link>
            </header>
            <form >
                <h1>Cadastro do<br/>ponto de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">           
                        Nome da entidade
                        </label>
                        <input 
                        type="text"
                        name="name"
                        id="name"
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
                        required
                        />
                    </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <samp>selecione seu endereço no mapa</samp>
                    </legend>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">
                                Estado (UF)
                            </label>
                            <select className="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">
                                Cidade
                            </label>
                            <select className="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <samp>selecione um ou mais intens abaixo</samp>
                    </legend>
                    <ul className="items-grid">
                        <li>
                            <img src="./" alt="item"/>
                            <span>item normal</span>
                        </li>
                        <li>
                            <img src="./" alt="item"/>
                            <span>item normal</span>
                        </li>
                        <li>
                            <img src="./" alt="item"/>
                            <span>item normal</span>
                        </li>
                        <li>
                            <img src="./" alt="item"/>
                            <span>item normal</span>
                        </li>
                        <li>
                            <img src="./" alt="item"/>
                            <span>item normal</span>
                        </li>
                        <li>
                            <img src="./" alt="item"/>
                            <span>item normal</span>
                        </li>
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