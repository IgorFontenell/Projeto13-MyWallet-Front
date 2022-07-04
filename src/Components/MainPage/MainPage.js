import { Link } from "react-router-dom";
import styled from "styled-components";
import Item from "./Item";
import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext/UserContext";
import axios from "axios";

export default function MainPage() {

    const { user, setUser } = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [sum, setSum ] = useState(0);
    const [teste, setTeste ] = useState(0);
    const [teste2, setTeste2 ] = useState(0);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}` 
        }
    };
    
    
    console.log(user.token);

    useEffect((() => {
        const request = axios.get("http://localhost:5001/items", config);
        request.then(response => {
            console.log(response.data);
            setItems(response.data);
            setTeste(1);
        });
    }), []);

    useEffect((() => {
        const request = axios.get("http://localhost:5001/user", config);
        request.then(response => {
            console.log(response);
            setUser({...user, name: response.data});
            setTeste2(1);
        });
    }), []);

    function Items () {
        let dataItems;
        let soma = 0;
            dataItems = items.map(object => {
                let number = Number(object.value);
                soma += number;
                return (<Item day={object.date} description={object.description} value={number}/>);
                });
        setSum(soma);
        console.log(dataItems);
        
        return (dataItems);
    }

    return (
        <>
        <Header>
            {teste2 === 0 ? <></> : <span>Olá, {user.name}</span>}
            <ion-icon name="exit-outline"></ion-icon>
        </Header>
        <Content>
            
            {
                teste === 0 ? <><h2>Não há registros de </h2><h2>entrada ou saída</h2></> : <Items />
            }
            
            <Total value={sum}>
                <span>Saldo</span>
                <span>{sum}</span>
            </Total>
        </Content>
        <Buttons>
            <Link to="/input">
            <Box>
                <ion-icon name="add-circle-outline"></ion-icon>
                <span>Nova entrada</span>
            </Box>
            </Link>
            <Link to="/output">
                <Box>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <span>Nova saída</span>
                </Box>
            </Link>
        </Buttons>
        </>
    );
}
const Header = styled.div`
    width: 326px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    color: #FFFFFF;
    font-family: 'Raleway';
    font-weight: bold;
    margin-bottom: 15px;
    
    ion-icon {
        font-size: 30px;
    }
`
const Content = styled.div`
    width: 326px;
    height: 446px;
    background-color: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    padding-top: 20px;
    h2 {
        font-family: 'Raleway';
        font-size: 20px;
        color: #868686;
        
    }
`
const Buttons = styled.div`
    width: 326px;
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
    a {
        text-decoration: none;
    }
`
const Box = styled.div`
    width: 155px;
    height: 114px;
    border-radius: 5px;
    background-color: #A328D6;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    padding-left: 8px;
    justify-content: space-around;
    span {
        display: inline-block;
        width: 64px;
        font-family: 'Raleway';
        font-size: 18px;
        font-weight: bolder;
    }
    ion-icon {
        font-size: 28px;
    }
`
const Total = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 15px;
    position: absolute;
    bottom: 15px;
    span:first-child {
        font-size: 20px;
        font-weight: bold;
        font-family: 'Raleway';

    }
    span:nth-child(2) {
        color: ${props => props.value < 0 ? "#C70000" : "#03AC00"};
    }


`
