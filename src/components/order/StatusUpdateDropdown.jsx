import {useState} from 'react';
import styled from 'styled-components';
import {Modal, ModalActions} from '../common/Modal.jsx';
import {getAvailableStatuses} from "../../utils/Utils.js";
import {Button} from "@mui/material";

const StatusSection = styled.div`
    border: 0.1em solid #e9ecef;
    padding: 1em;
`;

const StatusRow = styled.div`
    display: flex;
    gap: 1em;
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

    const handleConfirmUpdate = async () => {
        await onUpdateStatus(selectedStatus);
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
                <Button size='small'
                        onClick={handleUpdateClick}
                        disabled={isUpdating || selectedStatus === currentStatus}
                        loading={isUpdating}
                >Update Status</Button>
            </StatusRow>
            <Modal isOpen={showConfirmModal} onClose={handleCancel}>
                <h3>Confirm Status Change</h3>
                <p>Are you sure you want to change the order status from<strong> {currentStatus}</strong> to<strong> {selectedStatus}</strong>?</p>
                <ModalActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleConfirmUpdate} disabled={isUpdating} loading={isUpdating}>Confirm</Button>
                </ModalActions>
            </Modal>
        </StatusSection>
    );
}
