
import * as React from "react"
import { cn } from "@/lib/utils"

const BorderedTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm border-collapse border-2 border-gray-400", className)}
      {...props}
    />
  </div>
))
BorderedTable.displayName = "BorderedTable"

const BorderedTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("bg-gray-50 border-b-2 border-gray-400", className)} {...props} />
))
BorderedTableHeader.displayName = "BorderedTableHeader"

const BorderedTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("divide-y-2 divide-gray-400", className)}
    {...props}
  />
))
BorderedTableBody.displayName = "BorderedTableBody"

const BorderedTableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t-2 border-gray-400 bg-muted/50 font-medium",
      className
    )}
    {...props}
  />
))
BorderedTableFooter.displayName = "BorderedTableFooter"

const BorderedTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b-2 border-gray-400 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted divide-x-2 divide-gray-400",
      className
    )}
    {...props}
  />
))
BorderedTableRow.displayName = "BorderedTableRow"

const BorderedTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground border-r-2 border-gray-400 last:border-r-0",
      className
    )}
    {...props}
  />
))
BorderedTableHead.displayName = "BorderedTableHead"

const BorderedTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle border-r-2 border-gray-400 last:border-r-0", className)}
    {...props}
  />
))
BorderedTableCell.displayName = "BorderedTableCell"

const BorderedTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
BorderedTableCaption.displayName = "BorderedTableCaption"

export {
  BorderedTable,
  BorderedTableHeader,
  BorderedTableBody,
  BorderedTableFooter,
  BorderedTableHead,
  BorderedTableRow,
  BorderedTableCell,
  BorderedTableCaption,
}
