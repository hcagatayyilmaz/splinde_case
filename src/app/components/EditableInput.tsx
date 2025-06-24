"use client"

import {useState} from "react"
import {Input} from "@/app/ui/components/input"

interface EditableInputProps {
  value: number
  onSave: (newValue: number) => void
  className?: string
}

export function EditableInput({value, onSave, className}: EditableInputProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value.toString())

  const handleSave = () => {
    const newValue = parseInt(inputValue) || 0
    onSave(newValue)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
    }
    if (e.key === "Escape") {
      setInputValue(value.toString())
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <Input
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        className='w-16 h-6 text-xs inline-block'
        autoFocus
      />
    )
  }

  return (
    <span
      className={`cursor-pointer hover:bg-accent hover:text-accent-foreground px-1 rounded transition-colors ${className}`}
      onClick={() => {
        setIsEditing(true)
        setInputValue(value.toString())
      }}
    >
      {"Edit"}
    </span>
  )
}
