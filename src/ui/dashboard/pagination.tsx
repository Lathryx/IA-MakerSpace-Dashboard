'use client'; 

import { generatePagination } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from 'clsx'; 
import Link from 'next/link'; 
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react'; 

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname(); 
    const searchParams = useSearchParams(); 
    const currentPage = Number(searchParams.get('page')) || 1; 

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams); 
        params.set('page', pageNumber.toString()); 
        return `${pathname}?${params.toString()}`; 
    }; 

    const allPages = generatePagination(currentPage, totalPages); 

    return (
        <>
            <div className="inline-flex">
                <PaginationArrow direction="left" href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} /> 
            </div>

            <div className="flex -space-x-px">
                {allPages.map((page, index) => {
                    let position: 'first' | 'last' | 'single' | 'middle' | undefined;

                    if (index === 0) position = 'first';
                    if (index === allPages.length - 1) position = 'last';
                    if (allPages.length === 1) position = 'single';
                    if (page === '...') position = 'middle';

                    return (
                        <PaginationNumber
                            key={page}
                            href={createPageURL(page)}
                            page={page}
                            position={position}
                            isActive={currentPage === page}
                        />
                    );
            })}
            </div>

            <PaginationArrow direction="right" href={createPageURL(currentPage + 1)} isDisabled={currentPage >= totalPages} /> 
        </>
    )
}

function PaginationNumber({
    page, 
    href, 
    isActive, 
    position
}: {
    page: number | string; 
    href: string; 
    position?: 'first' | 'last' | 'middle' | 'single'; 
    isActive: boolean; 
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center text-sm border', 
        {
            'rounded-l-md': position === 'first' || position === 'single', 
            'rounded-r-md': position === 'last' || position === 'single', 
            'z-10 bg-tremor-brand dark:bg-dark-tremor-brand border-tremor-brand dark:border-dark-tremor-brand text-tremor-brand-inverted dark:text-dark-tremor-brand-inverted': isActive, 
            'hover:bg-tremor-brand-emphasis dark:hover:bg-dark-tremor-brand-emphasis hover:border-tremor-brand-emphasis dark:hover:border-dark-tremor-brand-emphasis': !isActive && position !== 'middle', 
            'text-gray-300': position === 'middle' 
        }
    ); 

    return isActive || position === 'middle' ? (
        <div className={className}>{page}</div> 
    ) : (
        <Link href={href} className={className}>{page}</Link> 
    ); 
} 

function PaginationArrow({
    href, 
    direction, 
    isDisabled 
}: {
    href: string; 
    direction: 'left' | 'right'; 
    isDisabled: boolean; 
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center rounded-md border border-tremor-brand dark:border-dark-tremor-brand',
        {
            'pointer-events-none text-tremor-content-subtle dark:text-dark-tremor-content-subtle border-tremor-background-muted dark:border-dark-tremor-background-muted': isDisabled,
            'hover:bg-gray-100': !isDisabled,
            'mr-2 md:mr-4': direction === 'left',
            'ml-2 md:ml-4': direction === 'right',
        },
    ); 

    const icon =
    direction === 'left' ? (
      <RiArrowLeftLine className="w-4" />
    ) : (
      <RiArrowRightLine className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}