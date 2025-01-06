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
  
  const onValueChange = (val: string) => {
      router.push(pathname + '?' + createQueryString('dimension', val))
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    router.push(pathname + '?' + createQueryString('dimension', e.target[0].value))
  }

  return <form onSubmit={onSubmit} className="max-w-72 flex gap-2"><Input type="text" placeholder="Search for a dimension" /><Button type="submit">Search</Button></form>
}
export default DimensionInput;