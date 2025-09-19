import { useState, useMemo, useEffect } from 'react';

/**
 * Custom hook for managing orders data and filtering/sorting logic
 */
export const useOrdersData = (ordersData) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [orders, setOrders] = useState(ordersData.data);

  // Get unique statuses for filter dropdown
  const uniqueStatuses = useMemo(() => {
    const statuses = [...new Set(orders.map(order => order.status))];
    return statuses;
  }, [orders]);

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = 
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];
        
        // Handle different data types
        if (sortField === 'orderId') {
          aValue = a.orderId.replace('#CM', '');
          bValue = b.orderId.replace('#CM', '');
        }
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [orders, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredAndSortedOrders.slice(startIndex, endIndex);

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilterDropdown && !event.target.closest('.filter-dropdown')) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterDropdown]);

  // Function to add a new order
  const addOrder = (newOrder) => {
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  return {
    // State
    selectedOrders,
    searchTerm,
    sortField,
    sortDirection,
    statusFilter,
    currentPage,
    itemsPerPage,
    showFilterDropdown,
    
    // Computed values
    uniqueStatuses,
    filteredAndSortedOrders,
    totalPages,
    startIndex,
    endIndex,
    currentOrders,
    
    // Setters
    setSelectedOrders,
    setSearchTerm,
    setSortField,
    setSortDirection,
    setStatusFilter,
    setCurrentPage,
    setShowFilterDropdown,
    
    // Functions
    addOrder
  };
};
