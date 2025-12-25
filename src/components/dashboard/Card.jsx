import styled from "styled-components";

const ItemComponent = styled.div`
    background-color: white;
    border-radius: 0.5em;
    color: black;;
    padding: 1em 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 1em;
    border: '1px solid #242424';
`;

export default function Card({children}) {
    return (
        <ItemComponent>
            {children}
        </ItemComponent>
    );
}