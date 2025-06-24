"use client"

import {useState} from "react"
import {Input} from "@/app/ui/components/input"

interface EditableInputProps {
  value: number
  onSave: (newValue: number) => void
  className?: string
}

export function EditableInput({value, onSave, className}: EditableInputProps) {
  const [inputValue, setInputValue] = useState(value.toString())

  const handleSave = () => {
    const newValue = parseInt(inputValue) || 0
    console.log("EditableInput saving:", newValue)
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
      className={`w-16 h-6 text-xs bg-white border border-gray-300 text-black focus:border-black focus:ring-0 ${className}`}
      autoFocus
    />
  )
}
