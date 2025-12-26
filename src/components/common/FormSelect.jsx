import styled from 'styled-components';
import {ErrorMessage} from "./ErrorMessage.jsx";
import {InputLabel} from "./InputLabel.jsx";

const RadioContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

export const FormSelect = ({label, name, options = [], required = false, error}) => {
    return (
        <div>
            <InputLabel className={required ? 'required' : ''}>{label}</InputLabel>
            <RadioContainer>
                {options.map((option) => (
                    <div key={option.label}>
                        <label key={option.value}>{option.label}</label>
                        <input type="radio" name={name} value={option.value} defaultChecked={option.default} />
                    </div>
                ))}
            </RadioContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
    );
};
