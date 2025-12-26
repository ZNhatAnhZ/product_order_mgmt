import styled from 'styled-components';
import {ErrorMessage} from "./ErrorMessage.jsx";
import {InputLabel} from "./InputLabel.jsx";

const StyledTextarea = styled.textarea`
    width: 100%;
    border: 0.2em solid ${props => props.haserror ? '#dc3545' : '#e1e5e9'};
    border-radius: 0.5em;
    min-height: 10em;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: ${props => props.haserror ? '#dc3545' : '#000000'};
    }
`;

const CharacterCount = styled.div`
    font-size: 0.75em;
    color: #6c757d;
    text-align: right;
`;

const FlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const FormTextarea = ({label, name, placeholder, required = false, error, maxLength, value = '', ...props}) => {
    return (
        <div>
            <InputLabel htmlFor={name} className={required ? 'required' : ''}>{label}</InputLabel>
            <StyledTextarea
                id={name}
                name={name}
                placeholder={placeholder}
                haserror={!!error}
                value={value}
                {...props}
            />
            <FlexDiv>
                {maxLength && (<CharacterCount>{value.length}/{maxLength}</CharacterCount>)}
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </FlexDiv>
        </div>
    );
};
