"use client"

import {useState} from "react"
import {Input} from "@/app/ui/components/input"

interface EditableInputProps {
  value: number | string
  onSave: (newValue: number | string) => void
  type?: "number" | "text"
  className?: string
}

export function EditableInput({value, onSave, type = "number", className}: EditableInputProps) {
  const [inputValue, setInputValue] = useState(value.toString())

  const handleSave = () => {
    const newValue = type === "number" ? parseInt(inputValue) || 0 : inputValue
    console.log("EditableInput saving:", newValue, "type:", type)
    onSave(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
    }
    if (e.key === "Escape") {
      setInputValue(value.toString())
    }
  }

  return (
    <Input
      value={inputValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleSave}
      className={`w-16 h-6 text-xs bg-white border-2 border-black text-black focus:border-gray-800 focus:ring-1 focus:ring-gray-800 shadow-sm ${className}`}
      autoFocus
    />
  )
}
