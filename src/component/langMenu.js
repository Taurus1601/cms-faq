"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuRadioGroupDemo({ onLanguageChange }) {
    const handleValueChange = (value) => {
        setPosition(value);
        onLanguageChange(value); // Call the parent callback with the new value
      };
  const [position, setPosition] = React.useState("English")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Choose language</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
       
        <DropdownMenuRadioGroup value={position} onValueChange={handleValueChange} >
          <DropdownMenuRadioItem value="hi">Hindi</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bn">Bengali</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
