import { useState, useContext } from "react";
import UserContext from "../UserContext/UserContext";
import styled from "styled-components";
import axios from "axios";

export default function Item ({ day, description, value }) {
    let positive;
    if(value < 0 ) {
        positive = false;
    } else {
        positive = true;
    }


    return(
        <ItemBox>
            <BoxLeft>
                <span style={{color: "#C6C6C6"}}>{day}</span><span>{description}</span>
            </BoxLeft>
            <BoxRight tipo={positive}>
                <span>{value}</span>
            </BoxRight>
        </ItemBox>
    );
}

const ItemBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    span {
        font-family: 'Raleway';
        font-size: 16px;
    }
`;
const BoxLeft = styled.div`
    padding-left: 5px;
    span {
        margin-left: 10px;
    }
`
const BoxRight  = styled.div`
    padding-right: 15px;
    color: ${props => props.tipo ? "#03AC00" : "#C70000"};
`