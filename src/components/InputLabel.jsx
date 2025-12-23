import styled from "styled-components";

export const InputLabel = styled.label`
    font-weight: 600;
    
    &.required::after {
        content: ' *';
        color: #dc3545;
        font-weight: 300;
    }
`;