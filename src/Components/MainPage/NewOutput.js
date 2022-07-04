import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../UserContext/UserContext";


export default function NewOutput () {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [ eventInfo, setEventInfo ] = useState({
        value: "",
        description: "",
        date: "",
        });
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}` 
            }
        };


function UpdateEvent (event) {
    setEventInfo({
        ...eventInfo, [event.target.name]: event.target.value
    });
};

function SaveInput (event) {
    event.preventDefault();
    
    
    const request = axios.post("http://localhost:5001/item", {
        value: eventInfo.value,
        description: eventInfo.description,
        date: eventInfo.date
    }, config);
     request.then(() => {
         alert("Item cadastrado com sucesso");
         navigate("/conta");
     });
     request.catch(() => alert("Algo deu errado!"));
    
}



    return(
        <>
        <Content>
            <Page>
                
                <span>Nova saída</span>
                <form>
                    <input type="text" placeholder="Descrição" name="description" value={eventInfo.description} onChange={UpdateEvent} required></input>
                    <input type="text" placeholder="Valor" name="value" value={eventInfo.value} onChange={UpdateEvent} required></input>
                    <input type="date" placeholder="Data" name="date" value={eventInfo.date} onChange={UpdateEvent} required></input>
                    <div onClick={SaveInput}>
                        <span>Salvar saída</span>
                    </div>
                </form>
            </Page>
        </Content>
        </>
    );

}
const Content = styled.div`
    width: 100%;
    height: 100vh;
`
const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    > span{
        display: inline-block;
        width: 326px;
        font-size: 32px;
        color: #FFFFFF;
        font-family: 'Raleway';
        font-weight: bold;
        margin-bottom: 30px;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input {
        width: 326px;
        height: 58px;
        border: 1px solid black;
        border-radius: 5px;
        margin-bottom: 15px;
        background-color: #FFFFFF;
        font-size: 20px;
        padding-left: 10px;
        color: #000000;
        
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
        border: 1px solid black;
    }
    
`;
