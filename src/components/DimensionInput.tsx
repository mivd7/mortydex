/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Input } from "@/components/ui/input"
import { FC, useCallback } from "react"
import { Button } from "./ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const DimensionInput: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)

   
        return params.toString()
      },
      [searchParams]
    )

  const onSubmit = (e: any) => {
    
    e.preventDefault();
    router.push(pathname + '?' + createQueryString('dimension', e.target[0].value))
  }

  return <form onSubmit={onSubmit} className="flex gap-2"><Input type="text" placeholder="e.g. Dimension C-137, Replacement Dimension etc." className="flex-shrink"/><Button type="submit">Search</Button></form>
}
export default DimensionInput;