import '../../assets/modal.css';
import styled from "styled-components";

export function Modal({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content">
                {children}
                <button className="modal-close-button" onClick={onClose}>&times;</button>
            </div>
        </div>
    );
}

export const ModalActions = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;