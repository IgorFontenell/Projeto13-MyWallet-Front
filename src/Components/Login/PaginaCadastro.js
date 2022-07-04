import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function PaginaCadastro() {
    const navigate = useNavigate();
    const [ userInfo, setUserInfo ] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    console.log(userInfo);
    function UpdateUser (event) {
        setUserInfo({
            ...userInfo, [event.target.name]: event.target.value
        });
    };
    
    function SignUp (event) {
        event.preventDefault();
        
        if(userInfo.password !== userInfo.passwordConfirm){
            alert("Senhas diferentes. Favor confirmar a senha corretamente");
            return;
        };
        const request = axios.post("http://localhost:5001/cadastro", {
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password
        });
         request.then(() => {
             alert("Usuário cadastrado com sucesso");
             navigate("/");
         });
         request.catch(() => alert("Algo deu errado!"));
         console.log( "foi?");
    }


    return(
        <>
        <Register>
            <span>MyWallet</span>
            <form>
                <input type="text" placeholder="Nome" name="name" value={userInfo.name} onChange={UpdateUser} required></input>
                <input type="email" placeholder="E-mail" name="email" value={userInfo.email} onChange={UpdateUser} required></input>
                <input type="password" placeholder="Senha" name="password" value={userInfo.password} onChange={UpdateUser} required></input>
                <input type="password" placeholder="Confirme a senha" name="passwordConfirm" value={userInfo.passwordConfirm} onChange={UpdateUser} required></input>
                <div onClick={SignUp}>
                    <span>Cadastrar</span>
                </div>
            </form>
            <Link to="/">
                <h3>Já tem uma conta? Entre agora!</h3>
            </Link>
        </Register>
        </>
    );
}

const Register = styled.div`
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

