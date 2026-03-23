import { ReactNode } from 'react';

interface TableProps {
  headers: string[];
  children: ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-left py-3 px-4 text-sm font-medium text-gray-400"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
}

export function TableRow({ children, onClick }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {children}
    </tr>
  );
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export function TableCell({ children, className = '' }: TableCellProps) {
  return (
    <td className={`py-4 px-4 text-sm ${className}`}>
      {children}
    </td>
  );
}
