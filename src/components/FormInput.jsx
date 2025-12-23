import styled from 'styled-components';
import {ErrorMessage} from "./ErrorMessage.jsx";
import {InputLabel} from "./InputLabel.jsx";

const StyledInput = styled.input`
    width: 100%;
    border: 0.1em solid ${props => props.haserror ? '#dc3545' : '#e1e5e9'};
    border-radius: 0.2em;
    
    &:focus {
        outline: none;
        border-color: ${props => props.haserror ? '#dc3545' : '#000000'};
    }
`;

export const FormInput = ({
    label,
    name,
    type = 'text',
    placeholder,
    required = false,
    error,
    ...props
}) => {
    return (
        <div>
            <InputLabel htmlFor={name} className={required ? 'required' : ''}>{label}</InputLabel>
            <StyledInput
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                haserror={!!error}
                {...props}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
    );
};
