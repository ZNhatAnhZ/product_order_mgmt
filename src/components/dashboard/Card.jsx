import styled from "styled-components";

const ItemComponent = styled.div`
    padding: 1em;
    display: flex;
    flex-direction: column;
`;

export default function Card({children}) {
    return (
        <ItemComponent>
            {children}
        </ItemComponent>
    );
}