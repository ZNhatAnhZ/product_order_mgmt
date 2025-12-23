import {useState} from 'react';
import styled from 'styled-components';
import Modal from './Modal.jsx';
import {getAvailableStatuses} from "../utils/Utils.js";

const StatusSection = styled.div`
    border: 1px solid #e9ecef;
    padding: 1em;
    margin: 1em 0;
`;

const StatusRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
    margin-bottom: 1em;
`;

const ModalActions = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

export default function StatusUpdateDropdown({currentStatus, onUpdateStatus, isUpdating}) {
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const availableStatuses = getAvailableStatuses(currentStatus);

    const handleUpdateClick = () => {
        if (selectedStatus !== currentStatus) {
            setShowConfirmModal(true);
        }
    };

    const handleConfirmUpdate = () => {
        onUpdateStatus(selectedStatus);
        setShowConfirmModal(false);
    };

    const handleCancel = () => {
        setSelectedStatus(currentStatus);
        setShowConfirmModal(false);
    };

    if (availableStatuses.length === 0) {
        return (
            <StatusSection>
                <h3>Status Update</h3>
                <p>This order status cannot be changed.</p>
            </StatusSection>
        );
    }

    return (
        <>
            <StatusSection>
                <h3>Update Order Status</h3>
                <StatusRow>
                    <label htmlFor="status-select">Change Status:</label>
                    <select
                        id="status-select"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        disabled={isUpdating}
                    >
                        <option value={currentStatus}>{currentStatus} (Current)</option>
                        {availableStatuses.map(status => (<option key={status} value={status}>{status}</option>))}
                    </select>
                    <button onClick={handleUpdateClick} disabled={isUpdating || selectedStatus === currentStatus}>
                        {isUpdating ? 'Updating...' : 'Update Status'}
                    </button>
                </StatusRow>
            </StatusSection>
            <Modal
                isOpen={showConfirmModal}
                onClose={handleCancel}
            >
                <div>
                    <h3>Confirm Status Change</h3>
                    <p>Are you sure you want to change the order status from
                        <strong> {currentStatus}</strong> to
                        <strong> {selectedStatus}</strong>?
                    </p>
                    <ModalActions>
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleConfirmUpdate} disabled={isUpdating}>{isUpdating ? 'Updating...' : 'Confirm'}</button>
                    </ModalActions>
                </div>
            </Modal>
        </>
    );
}
