import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertCircle } from 'lucide-react';

const ConfirmationDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "danger"
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
            <div className="flex flex-col items-center text-center">
                <div className={`p-4 rounded-full mb-4 ${type === 'danger' ? 'bg-red-50 text-red-500' : 'bg-primary-50 text-primary-500'}`}>
                    <AlertCircle size={40} />
                </div>
                <p className="text-neutral-600 mb-8 leading-relaxed">
                    {message}
                </p>
                <div className="flex items-center gap-3 w-full">
                    <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={onClose}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={type === 'danger' ? 'primary' : 'primary'}
                        className={`flex-1 ${type === 'danger' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationDialog;
