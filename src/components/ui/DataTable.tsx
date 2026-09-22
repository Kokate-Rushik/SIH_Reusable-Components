import React from 'react';
import { cn } from '../../lib/utils';
import { Inbox } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  render?: (item: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data?: T[];
  keyExtractor?: (item: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data = [],
  keyExtractor,
  emptyMessage = 'No records found matching current criteria.',
  className,
}: DataTableProps<T>) {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className={cn('surface-card overflow-hidden w-full', className)}>
      <div className="overflow-x-auto w-full scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-full">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'table-header-cell whitespace-nowrap',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right',
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="table-body-cell text-center py-10 text-slate-500 font-normal"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                      <Inbox className="h-4 w-4" />
                    </div>
                    <span className="text-xs text-slate-600">{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              safeData.map((item, index) => {
                const key = keyExtractor ? keyExtractor(item, index) : index;
                return (
                  <tr
                    key={key}
                    className="hover:bg-slate-50/75 transition-colors border-b border-slate-100 last:border-b-0"
                  >
                    {columns.map((col) => {
                      const cellValue = item ? item[col.key] : undefined;
                      return (
                        <td
                          key={col.key}
                          className={cn(
                            'table-body-cell',
                            col.align === 'center' && 'text-center',
                            col.align === 'right' && 'text-right',
                            col.className
                          )}
                        >
                          {col.render
                            ? col.render(item, index)
                            : cellValue !== undefined && cellValue !== null && cellValue !== ''
                            ? String(cellValue)
                            : <span className="text-slate-400 font-mono">—</span>}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

