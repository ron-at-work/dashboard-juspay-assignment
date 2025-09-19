/**
 * Custom hook for table-specific logic
 */
export const useOrdersTable = (ordersData, ordersDataHook) => {
  const {
    selectedOrders,
    setSelectedOrders,
    filteredAndSortedOrders,
    setSortField,
    setSortDirection,
    sortField,
    sortDirection
  } = ordersDataHook;

  // Handle checkbox selection
  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedOrders.length === filteredAndSortedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredAndSortedOrders.map(order => order.id));
    }
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return {
    handleSelectOrder,
    handleSelectAll,
    handleSort
  };
};
