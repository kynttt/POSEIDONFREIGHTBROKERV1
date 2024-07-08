import React from 'react';
import notifications from './notifications.json'; // Adjust the path as necessary

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center md:justify-end md:items-start md:p-8">
            <div className="bg-white rounded-lg w-full md:w-1/3 lg:w-1/4 p-8 mt-4 md:mt-0 md:mr-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl text-secondary font-normal">Notifications</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900">&times;</button>
                </div>
                <div className="space-y-4">
                    {notifications.map(notification => (
                        <div key={notification.id} className="flex items-center justify-between bg-gray-100 rounded-lg p-2 h-20 shadow">
                            <div className="flex items-center">
                                <div className="bg-primary text-white rounded-full p-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 6.293a1 1 0 010 1.414L8.414 16l-4.707-4.707a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-medium text-primary">{notification.title}</h3>
                                    <p className="text-secondary font-light">{notification.message}</p>
                                </div>
                            </div>
                            <span className="text-gray-600 text-sm font-light">{notification.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
