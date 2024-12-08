import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { headers } from "next/headers"; // Import headers to get the referer and route
import React from "react";

export default function DynamicBreadcrumb() {
  // Extract current route from the referer header
  const headersList = headers();
  const referer = headersList.get("referer");
  const currentRoute = referer ? new URL(referer).pathname : "/";
  const breadcrumbSegments = currentRoute.split("/").filter(Boolean); // Remove empty strings

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
