import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOrdersData } from '../hooks/useOrdersData';
import { useOrdersTable } from '../hooks/useOrdersTable';
import OrdersHeader from './orders/OrdersHeader';
import OrdersTable from './orders/OrdersTable';
import OrdersPagination from './orders/OrdersPagination';
import AddOrderModal from './orders/AddOrderModal';

/**
 * OrdersPage component for displaying order list table
 * @param {Object} props - Component props
 * @param {Object} props.ordersData - Orders data from JSON
 */
const OrdersPage = ({ ordersData }) => {
  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Custom hooks for data management
  const ordersDataHook = useOrdersData(ordersData);
  const tableHook = useOrdersTable(ordersData, ordersDataHook);

  // Destructure data from hooks
  const {
    selectedOrders,
    searchTerm,
    sortField,
    sortDirection,
    statusFilter,
    currentPage,
    showFilterDropdown,
    uniqueStatuses,
    filteredAndSortedOrders,
    totalPages,
    startIndex,
    endIndex,
    currentOrders,
    setSearchTerm,
    setShowFilterDropdown,
    setStatusFilter,
    setCurrentPage
  } = ordersDataHook;

  const { handleSelectAll, handleSelectOrder, handleSort } = tableHook;

  // Handle status filter with page reset
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Modal handlers
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddOrder = (newOrder) => {
    // Add the new order to the beginning of the list
    ordersDataHook.addOrder(newOrder);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-6 bg-dashboard-bgPrimary overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <OrdersHeader
          ordersData={ordersData}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilterDropdown={showFilterDropdown}
          setShowFilterDropdown={setShowFilterDropdown}
          uniqueStatuses={uniqueStatuses}
          statusFilter={statusFilter}
          handleStatusFilter={handleStatusFilter}
          onOpenAddModal={handleOpenAddModal}
        />

        {/* Orders Table */}
        <OrdersTable
          ordersData={ordersData}
          currentOrders={currentOrders}
          selectedOrders={selectedOrders}
          sortField={sortField}
          sortDirection={sortDirection}
          handleSelectAll={handleSelectAll}
          handleSelectOrder={handleSelectOrder}
          handleSort={handleSort}
        />

        {/* Pagination */}
        <OrdersPagination
          filteredAndSortedOrders={filteredAndSortedOrders}
          startIndex={startIndex}
          endIndex={endIndex}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>

      {/* Add Order Modal */}
      <AddOrderModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAddOrder={handleAddOrder}
      />
    </motion.main>
  );
};

export default OrdersPage;
