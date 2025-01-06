'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FC, useCallback, useState } from "react"
 
interface Props {
  options: string[]
}

const DimensionSelect: FC<Props> = ({options}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      params.set('page', '1');
      return params.toString()
    },
    [searchParams]
  )

  const onValueChange = (val: string) => {
    router.push(pathname + '?' + createQueryString('dimension', val))
  }

  return (
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a dimension" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}

export default DimensionSelect;