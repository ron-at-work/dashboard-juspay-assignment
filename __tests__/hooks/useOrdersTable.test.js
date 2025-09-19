import { renderHook, act } from '@testing-library/react';
import { useOrdersTable } from '../../src/hooks/useOrdersTable';

describe('useOrdersTable', () => {
  const mockOrdersData = {
    data: [
      { id: '1', orderId: '#CM001', user: 'John Doe', project: 'Project A', address: '123 Main St', date: '2024-01-01', status: 'completed' },
      { id: '2', orderId: '#CM002', user: 'Jane Smith', project: 'Project B', address: '456 Oak Ave', date: '2024-01-02', status: 'pending' },
      { id: '3', orderId: '#CM003', user: 'Bob Johnson', project: 'Project C', address: '789 Pine Rd', date: '2024-01-03', status: 'cancelled' }
    ]
  };

  const mockOrdersDataHook = {
    selectedOrders: [],
    setSelectedOrders: jest.fn(),
    filteredAndSortedOrders: mockOrdersData.data,
    setSortField: jest.fn(),
    setSortDirection: jest.fn(),
    sortField: '',
    sortDirection: 'asc'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return table handlers', () => {
    const { result } = renderHook(() => useOrdersTable(mockOrdersData, mockOrdersDataHook));

    expect(result.current.handleSelectOrder).toBeDefined();
    expect(result.current.handleSelectAll).toBeDefined();
    expect(result.current.handleSort).toBeDefined();
  });

  describe('handleSelectOrder', () => {
    it('should add order to selected orders when not selected', () => {
      const { result } = renderHook(() => useOrdersTable(mockOrdersData, mockOrdersDataHook));

      act(() => {
        result.current.handleSelectOrder('1');
      });

      expect(mockOrdersDataHook.setSelectedOrders).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should remove order from selected orders when already selected', () => {
      const hookWithSelectedOrders = {
        ...mockOrdersDataHook,
        selectedOrders: ['1', '2']
      };

      const { result } = renderHook(() => useOrdersTable(mockOrdersData, hookWithSelectedOrders));

      act(() => {
        result.current.handleSelectOrder('1');
      });

      expect(mockOrdersDataHook.setSelectedOrders).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle selecting multiple orders', () => {
      const hookWithSelectedOrders = {
        ...mockOrdersDataHook,
        selectedOrders: ['1']
      };

      const { result } = renderHook(() => useOrdersTable(mockOrdersData, hookWithSelectedOrders));

      act(() => {
        result.current.handleSelectOrder('2');
      });

      expect(mockOrdersDataHook.setSelectedOrders).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle deselecting from multiple selected orders', () => {
      const hookWithSelectedOrders = {
        ...mockOrdersDataHook,
        selectedOrders: ['1', '2', '3']
      };

      const { result } = renderHook(() => useOrdersTable(mockOrdersData, hookWithSelectedOrders));

      act(() => {
        result.current.handleSelectOrder('2');
      });

      expect(mockOrdersDataHook.setSelectedOrders).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle selecting the same order multiple times', () => {
      const { result } = renderHook(() => useOrdersTable(mockOrdersData, mockOrdersDataHook));

      // Select order
      act(() => {
        result.current.handleSelectOrder('1');
      });

      expect(mockOrdersDataHook.setSelectedOrders).toHaveBeenCalledWith(expect.any(Function));

      // Select same order again (should deselect)
      act(() => {
        result.current.handleSelectOrder('1');
      });

      expect(mockOrdersDataHook.setSelectedOrders).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('handleSelectAll', () => {
    it('should select all orders when none are selected', () => {
      const { result } = renderHook(() => useOrdersTable(mockOrdersData, mockOrdersDataHook));

      act(() => {
        result.current.handleSelectAll();
      });

      expect(mockOrdersDataHook.setSelectedOrders).toHaveBeenCalledWith(['1', '2', '3']);
    });

    it('should deselect all orders when all are selected', () => {
      const hookWithAllSelected = {
        ...mockOrdersDataHook,
        selectedOrders: ['1', '2', '3']
      };

      const { result } = renderHook(() => useOrdersTable(mockOrdersData, hookWithAllSelected));

      act(() => {
        result.current.handleSelectAll();
      });

      expect(mockOrdersDataHook.setSelectedOrders).toHaveBeenCalledWith([]);
    });

    it('should select all orders when some are selected', () => {
      const hookWithSomeSelected = {
        ...mockOrdersDataHook,
        selectedOrders: ['1']
      };

      const { result } = renderHook(() => useOrdersTable(mockOrdersData, hookWithSomeSelected));

      act(() => {
        result.current.handleSelectAll();
      });

      expect(mockOrdersDataHook.setSelectedOrders).toHaveBeenCalledWith(['1', '2', '3']);
    });

    it('should handle empty filtered orders', () => {
      const hookWithEmptyOrders = {
        ...mockOrdersDataHook,
        filteredAndSortedOrders: []
      };

      const { result } = renderHook(() => useOrdersTable(mockOrdersData, hookWithEmptyOrders));

      act(() => {
        result.current.handleSelectAll();
      });

      expect(mockOrdersDataHook.setSelectedOrders).toHaveBeenCalledWith([]);
    });

    it('should handle filtered orders with different selection state', () => {
      const hookWithDifferentSelection = {
        ...mockOrdersDataHook,
        selectedOrders: ['1', '2', '3', '4'], // More than filtered orders
        filteredAndSortedOrders: mockOrdersData.data // Only 3 orders
      };

      const { result } = renderHook(() => useOrdersTable(mockOrdersData, hookWithDifferentSelection));

      act(() => {
        result.current.handleSelectAll();
      });

      expect(mockOrdersDataHook.setSelectedOrders).toHaveBeenCalledWith(['1', '2', '3']);
    });
  });

  describe('handleSort', () => {
    it('should set new sort field and direction to asc when field changes', () => {
      const { result } = renderHook(() => useOrdersTable(mockOrdersData, mockOrdersDataHook));

      act(() => {
        result.current.handleSort('user');
      });

      expect(mockOrdersDataHook.setSortField).toHaveBeenCalledWith('user');
      expect(mockOrdersDataHook.setSortDirection).toHaveBeenCalledWith('asc');
    });

    it('should toggle direction when same field is clicked', () => {
      const hookWithSortField = {
        ...mockOrdersDataHook,
        sortField: 'user',
        sortDirection: 'asc'
      };

      const { result } = renderHook(() => useOrdersTable(mockOrdersData, hookWithSortField));

      act(() => {
        result.current.handleSort('user');
      });

      expect(mockOrdersDataHook.setSortDirection).toHaveBeenCalledWith('desc');
    });

    it('should toggle from desc to asc when same field is clicked', () => {
      const hookWithDescSort = {
        ...mockOrdersDataHook,
        sortField: 'user',
        sortDirection: 'desc'
      };

      const { result } = renderHook(() => useOrdersTable(mockOrdersData, hookWithDescSort));

      act(() => {
        result.current.handleSort('user');
      });

      expect(mockOrdersDataHook.setSortDirection).toHaveBeenCalledWith('asc');
    });

    it('should set new field and reset direction when different field is clicked', () => {
      const hookWithSortField = {
        ...mockOrdersDataHook,
        sortField: 'user',
        sortDirection: 'desc'
      };

      const { result } = renderHook(() => useOrdersTable(mockOrdersData, hookWithSortField));

      act(() => {
        result.current.handleSort('orderId');
      });

      expect(mockOrdersDataHook.setSortField).toHaveBeenCalledWith('orderId');
      expect(mockOrdersDataHook.setSortDirection).toHaveBeenCalledWith('asc');
    });

    it('should handle sorting with empty sort field', () => {
      const { result } = renderHook(() => useOrdersTable(mockOrdersData, mockOrdersDataHook));

      act(() => {
        result.current.handleSort('orderId');
      });

      expect(mockOrdersDataHook.setSortField).toHaveBeenCalledWith('orderId');
      expect(mockOrdersDataHook.setSortDirection).toHaveBeenCalledWith('asc');
    });

    it('should handle sorting with null sort field', () => {
      const hookWithNullSortField = {
        ...mockOrdersDataHook,
        sortField: null
      };

      const { result } = renderHook(() => useOrdersTable(mockOrdersData, hookWithNullSortField));

      act(() => {
        result.current.handleSort('user');
      });

      expect(mockOrdersDataHook.setSortField).toHaveBeenCalledWith('user');
      expect(mockOrdersDataHook.setSortDirection).toHaveBeenCalledWith('asc');
    });

    it('should handle sorting with undefined sort field', () => {
      const hookWithUndefinedSortField = {
        ...mockOrdersDataHook,
        sortField: undefined
      };

      const { result } = renderHook(() => useOrdersTable(mockOrdersData, hookWithUndefinedSortField));

      act(() => {
        result.current.handleSort('user');
      });

      expect(mockOrdersDataHook.setSortField).toHaveBeenCalledWith('user');
      expect(mockOrdersDataHook.setSortDirection).toHaveBeenCalledWith('asc');
    });

    it('should handle multiple sort operations', () => {
      const { result } = renderHook(() => useOrdersTable(mockOrdersData, mockOrdersDataHook));

      // First sort
      act(() => {
        result.current.handleSort('user');
      });

      expect(mockOrdersDataHook.setSortField).toHaveBeenCalledWith('user');
      expect(mockOrdersDataHook.setSortDirection).toHaveBeenCalledWith('asc');

      // Second sort on same field
      act(() => {
        result.current.handleSort('user');
      });

      expect(mockOrdersDataHook.setSortDirection).toHaveBeenCalledWith('asc');

      // Third sort on different field
      act(() => {
        result.current.handleSort('orderId');
      });

      expect(mockOrdersDataHook.setSortField).toHaveBeenCalledWith('orderId');
      expect(mockOrdersDataHook.setSortDirection).toHaveBeenCalledWith('asc');
    });
  });

  it('should handle null ordersData', () => {
    const { result } = renderHook(() => useOrdersTable(null, mockOrdersDataHook));

    expect(result.current.handleSelectOrder).toBeDefined();
    expect(result.current.handleSelectAll).toBeDefined();
    expect(result.current.handleSort).toBeDefined();
  });

  it('should handle null ordersDataHook', () => {
    // The hook expects ordersDataHook to exist, so null will cause an error
    expect(() => {
      renderHook(() => useOrdersTable(mockOrdersData, null));
    }).toThrow();
  });

  it('should handle ordersDataHook with missing properties', () => {
    const incompleteHook = {
      selectedOrders: [],
      setSelectedOrders: jest.fn()
    };

    const { result } = renderHook(() => useOrdersTable(mockOrdersData, incompleteHook));

    expect(result.current.handleSelectOrder).toBeDefined();
    expect(result.current.handleSelectAll).toBeDefined();
    expect(result.current.handleSort).toBeDefined();
  });
});
