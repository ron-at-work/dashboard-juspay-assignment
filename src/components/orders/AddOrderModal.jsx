import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Modal component for adding new orders
 */
const AddOrderModal = ({ isOpen, onClose, onAddOrder }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    orderId: '',
    user: '',
    project: '',
    address: '',
    status: 'In Progress',
    statusColor: 'purple'
  });

  const [errors, setErrors] = useState({});

  const statusOptions = [
    { value: 'In Progress', label: 'In Progress', color: 'purple' },
    { value: 'Completed', label: 'Completed', color: 'green' },
    { value: 'Pending', label: 'Pending', color: 'blue' },
    { value: 'Cancelled', label: 'Cancelled', color: 'orange' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleStatusChange = (status) => {
    const selectedStatus = statusOptions.find(option => option.value === status);
    setFormData(prev => ({
      ...prev,
      status: status,
      statusColor: selectedStatus.color
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.orderId.trim()) {
      newErrors.orderId = 'Order ID is required';
    }
    if (!formData.user.trim()) {
      newErrors.user = 'User name is required';
    }
    if (!formData.project.trim()) {
      newErrors.project = 'Project name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newOrder = {
        id: Date.now(), // Simple ID generation
        orderId: formData.orderId,
        user: formData.user,
        project: formData.project,
        address: formData.address,
        date: 'Just now',
        status: formData.status,
        statusColor: formData.statusColor
      };

      onAddOrder(newOrder);
      
      // Reset form
      setFormData({
        orderId: '',
        user: '',
        project: '',
        address: '',
        status: 'In Progress',
        statusColor: 'purple'
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      orderId: '',
      user: '',
      project: '',
      address: '',
      status: 'In Progress',
      statusColor: 'purple'
    });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-dashboard-card rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dashboard-border">
              <h2 className="text-xl font-semibold text-dashboard-textPrimary">
                Add New Order
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-dashboard-bgSecondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-dashboard-textSecondary" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Order ID */}
              <div>
                <label className="block text-sm font-medium text-dashboard-textPrimary mb-2">
                  Order ID *
                </label>
                <input
                  type="text"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleInputChange}
                  placeholder="e.g., #CM9801"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dashboard-accent focus:border-transparent bg-dashboard-bgSecondary text-dashboard-textPrimary placeholder-dashboard-textTertiary ${
                    errors.orderId ? 'border-red-500' : 'border-dashboard-border'
                  }`}
                />
                {errors.orderId && (
                  <p className="text-red-500 text-sm mt-1">{errors.orderId}</p>
                )}
              </div>

              {/* User */}
              <div>
                <label className="block text-sm font-medium text-dashboard-textPrimary mb-2">
                  User Name *
                </label>
                <input
                  type="text"
                  name="user"
                  value={formData.user}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dashboard-accent focus:border-transparent bg-dashboard-bgSecondary text-dashboard-textPrimary placeholder-dashboard-textTertiary ${
                    errors.user ? 'border-red-500' : 'border-dashboard-border'
                  }`}
                />
                {errors.user && (
                  <p className="text-red-500 text-sm mt-1">{errors.user}</p>
                )}
              </div>

              {/* Project */}
              <div>
                <label className="block text-sm font-medium text-dashboard-textPrimary mb-2">
                  Project *
                </label>
                <input
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  placeholder="e.g., Landing Page"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dashboard-accent focus:border-transparent bg-dashboard-bgSecondary text-dashboard-textPrimary placeholder-dashboard-textTertiary ${
                    errors.project ? 'border-red-500' : 'border-dashboard-border'
                  }`}
                />
                {errors.project && (
                  <p className="text-red-500 text-sm mt-1">{errors.project}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-dashboard-textPrimary mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g., 123 Main Street, City"
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dashboard-accent focus:border-transparent bg-dashboard-bgSecondary text-dashboard-textPrimary placeholder-dashboard-textTertiary resize-none ${
                    errors.address ? 'border-red-500' : 'border-dashboard-border'
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-dashboard-textPrimary mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dashboard-accent focus:border-transparent text-dashboard-textPrimary ${
                    theme === 'dark' 
                      ? 'bg-dashboard-bgPrimary border-dashboard-border' 
                      : 'bg-dashboard-bgSecondary border-dashboard-border'
                  }`}
                >
                  {statusOptions.map((option) => (
                    <option 
                      key={option.value} 
                      value={option.value}
                      className="bg-dashboard-bgPrimary text-dashboard-textPrimary"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className={`flex-1 px-4 py-2 border rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'border-dashboard-border text-dashboard-textSecondary hover:bg-dashboard-bgSecondary'
                      : 'border-dashboard-border text-dashboard-textSecondary hover:bg-dashboard-bgSecondary'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-dashboard-bgPrimary text-white hover:bg-opacity-90'
                      : 'bg-dashboard-bgSecondary text-dashboard-textPrimary hover:bg-opacity-90'
                  }`}
                >
                  Create Order
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

AddOrderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddOrder: PropTypes.func.isRequired,
};

export default AddOrderModal;
