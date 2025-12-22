import '../assets/modal.css';

export default function Modal({ isOpen, onClose, children }) {
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
};