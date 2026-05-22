# New Microsoft Word Document (168)

Source: New Microsoft Word Document (168).docx

import { cn } from "@/lib/utils"

function Skeleton({

  className,

  ...props

}) {

  return (

    (<div

      className={cn("animate-pulse rounded-md bg-primary/10", className)}

      {...props} />)

  );

}

export { Skeleton }
