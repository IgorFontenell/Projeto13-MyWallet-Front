
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../UserContext/UserContext";
import styled from "styled-components";
import axios from "axios";


export default function PaginaLogin() {
    const navigate = useNavigate();
    const [ userInfo, setUserInfo ] = useState({
        email: "",
        password: ""
    });

    const { user, setUser } = useContext(UserContext);

    function UpdateUser (event) {
        setUserInfo({
            ...userInfo, [event.target.name]: event.target.value
        });
    }

    function loginInto (event) {
        event.preventDefault();
        
       const request = axios.post("http://localhost:5001/login", {
           email: userInfo.email,
           password: userInfo.password
       });
        request.then((response) => {
            setUser({
                ...user, 
                email:  userInfo.email,
                token: response.data.token
            });
            navigate("/conta");
        });
        request.catch(() => alert("Algo deu errado!"));
        
    }
    


    return(
        <>
        <Login>
            <span>MyWallet</span>
            <form>
                <input type="email" placeholder="E-mail" name="email" value={userInfo.email} onChange={UpdateUser} required></input>
                <input type="password" placeholder="Senha" name="password" value={userInfo.password} onChange={UpdateUser} required></input>
                <div onClick={loginInto}>
                    <span>Entrar</span>
                </div>
            </form>
            <Link to="/cadastro">
                <h3>Primeira vez? Cadastre-se</h3>
            </Link>
        </Login>
        </>
    );
}

const Login = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > span{
        font-size: 32px;
        color: #FFFFFF;
        font-family: 'Saira Stencil One';
        margin-bottom: 30px;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    input {
        width: 326px;
        height: 58px;
        border-radius: 5px;
        margin-bottom: 15px;
        background-color: #FFFFFF;
        font-size: 20px;
        padding-left: 10px;
        color: #000000;
        border: 1px solid black;
    }
    div {
        width: 326px;
        height: 46px;
        background-color: #A328D6;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFFFFF;
        font-weight: bold;
        font-size: 20px;
        font-family: 'Raleway';
        border-radius: 5px;
        margin-bottom: 30px;
        border: 1px solid black;
    }
    a{
        color: white;
        h3 {
        font-family: 'Raleway';
        font-size: 18px;
        font-weight: bold;
        color: #FFFFFF;
    }
    }
    
    
`;
