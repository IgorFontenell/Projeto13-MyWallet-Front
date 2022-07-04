import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./UserContext/UserContext";
import styled from "styled-components";
import PaginaCadastro from "./Login/PaginaCadastro";
import PaginaLogin from "./Login/PaginaLogin";
import MainPage from "./MainPage/MainPage";
import NewInput from "./MainPage/NewInput";
import NewOutput from "./MainPage/NewOutput";




export default function App () {

    const [user, setUser] = useState({
        name: "",
        email: "",
        token: ""
    });

    return(
        <BrowserRouter>
        
            <UserContext.Provider value={{user, setUser}}>
            <Container>
                <Routes>
                        <Route path="/" element={<PaginaLogin />} />
                        <Route path="/cadastro" element={<PaginaCadastro />} />
                        <Route path="/conta" element={<MainPage />} />
                        <Route path="/input" element={<NewInput />} /> 
                        <Route path="/output" element={<NewOutput />} />
                </Routes>
            </Container>
            </UserContext.Provider>
        
        </BrowserRouter>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #8C11BE;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 10px;

`
