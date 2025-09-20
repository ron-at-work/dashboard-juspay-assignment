import React from 'react';

/**
 * Orders pagination component
 */
const OrdersPagination = ({ 
  filteredAndSortedOrders, 
  startIndex, 
  endIndex, 
  currentPage, 
  totalPages, 
  handlePageChange 
}) => {
  if (filteredAndSortedOrders.length === 0) return null;

  return (
    <div className="px-6 py-4 border-t border-dashboard-border">
      <div className="flex items-center justify-between">
        <div className="text-sm text-dashboard-textSecondary">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedOrders.length)} of {filteredAndSortedOrders.length} orders
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border border-dashboard-border rounded-lg hover:bg-dashboard-bgSenary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 text-dashboard-textSecondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Generate page numbers */}
          {/* Mobile: Show only current page */}
          <div className="block sm:hidden">
            <button
              className="px-3 py-1 text-sm rounded-lg bg-dashboard-accent text-dashboard-bgPrimary"
            >
              {currentPage}
            </button>
          </div>
          
          {/* Desktop: Show full pagination */}
          <div className="hidden sm:flex items-center space-x-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    pageNum === currentPage
                      ? 'bg-dashboard-accent text-dashboard-bgPrimary'
                      : 'text-dashboard-textSecondary hover:bg-dashboard-bgSenary'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border border-dashboard-border rounded-lg hover:bg-dashboard-bgSenary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 text-dashboard-textSecondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPagination;
