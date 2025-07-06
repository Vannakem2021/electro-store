"use client";

import React, { useState } from "react";

import { TableColumn, SortOptions } from "@/types/admin";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/ui/Icons";

interface DataTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  sortable?: boolean;
  sortOptions?: SortOptions;
  onSort?: (sortOptions: SortOptions) => void;
  selectable?: boolean;
  selectedItems?: T[];
  onSelectionChange?: (selectedItems: T[]) => void;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
  };
  emptyMessage?: string;
  className?: string;
}

/**
 * Reusable DataTable component for admin interfaces
 */
const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  sortable = true,
  sortOptions,
  onSort,
  selectable = false,
  selectedItems = [],
  onSelectionChange,
  pagination,
  emptyMessage = "No data available",
  className = "",
}: DataTableProps<T>) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSort = (field: string) => {
    if (!sortable || !onSort) return;

    const newDirection =
      sortOptions?.field === field && sortOptions?.direction === "asc"
        ? "desc"
        : "asc";

    onSort({ field, direction: newDirection });
  };

  const handleSelectAll = () => {
    if (!selectable || !onSelectionChange) return;

    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    if (newSelectAll) {
      onSelectionChange(data);
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (item: T) => {
    if (!selectable || !onSelectionChange) return;

    const isSelected = selectedItems.some(
      (selected) => selected.id === item.id
    );

    if (isSelected) {
      onSelectionChange(
        selectedItems.filter((selected) => selected.id !== item.id)
      );
    } else {
      onSelectionChange([...selectedItems, item]);
    }
  };

  const isItemSelected = (item: T) => {
    return selectedItems.some((selected) => selected.id === item.id);
  };

  const getSortIcon = (field: string) => {
    if (!sortOptions || sortOptions.field !== field) {
      return null;
    }

    return sortOptions.direction === "asc" ? (
      <ChevronUpIcon className="w-4 h-4" />
    ) : (
      <ChevronDownIcon className="w-4 h-4" />
    );
  };

  const renderPagination = () => {
    if (!pagination) return null;

    const { page, limit, total, onPageChange, onLimitChange } = pagination;
    const totalPages = Math.ceil(total / limit);
    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);

    return (
      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-900 placeholder-accessible focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus-accessible"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-700">of {total} results</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            {startItem}-{endItem} of {total}
          </span>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="p-2 text-gray-400-accessible hover:text-gray-700-accessible disabled:opacity-50 disabled:cursor-not-allowed focus-accessible"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum =
                Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
              if (pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3 py-1 text-sm rounded-md focus-accessible ${
                    pageNum === page
                      ? "bg-teal-600 text-white"
                      : "text-gray-700-accessible hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="p-2 text-gray-400-accessible hover:text-gray-700-accessible disabled:opacity-50 disabled:cursor-not-allowed focus-accessible"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div
        className={`bg-white rounded-md shadow-sm border border-gray-200 ${className}`}
      >
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-3 text-xs font-medium text-gray-500-accessible uppercase tracking-wider ${
                    column.align === "center"
                      ? "text-center"
                      : column.align === "right"
                      ? "text-right"
                      : "text-left"
                  } ${column.width ? `w-${column.width}` : ""}`}
                >
                  {column.sortable && sortable ? (
                    <button
                      onClick={() => handleSort(String(column.key))}
                      className="flex items-center space-x-1 hover:text-gray-700-accessible transition-colors duration-200 focus-accessible"
                    >
                      <span className="font-rubik">{column.label}</span>
                      {getSortIcon(String(column.key))}
                    </button>
                  ) : (
                    <span className="font-rubik">{column.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-6 py-8 text-center text-gray-500-accessible"
                >
                  <p>{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item.id || index}
                  className={`hover:bg-gray-50 transition-colors duration-200 ${
                    isItemSelected(item) ? "bg-teal-50" : ""
                  }`}
                >
                  {selectable && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isItemSelected(item)}
                        onChange={() => handleSelectItem(item)}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                        column.align === "center"
                          ? "text-center"
                          : column.align === "right"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {column.render
                        ? column.render(item[column.key], item)
                        : item[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {renderPagination()}
    </div>
  );
};

export default DataTable;
