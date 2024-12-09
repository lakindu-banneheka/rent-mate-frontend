'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

export default function DynamicBreadcrumb() {
  const currentRoute = usePathname();
  const breadcrumbSegments = currentRoute.split("/")
  .filter(Boolean) // Remove empty strings
  // .filter(segment => segment !== 'admin' && segment !== 'lender'); // remove the admin or lender components

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbSegments.map((segment, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === breadcrumbSegments.length - 1 ? (
                <BreadcrumbPage>
                  {segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={`/${breadcrumbSegments.slice(0, index + 1).join("/")}`}>
                  {segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbSegments.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}