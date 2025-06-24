"use client"

import {useState, useEffect} from "react"
import {TreeView, type TreeDataItem} from "@/ui/components/tree-view"
import {Section, Entry} from "@/constants/types"
import {EditableInput} from "./EditableInput"
import {useTreeDataContext} from "@/contexts/TreeDataContext"

function computeSum(item: Section | Entry): number {
  if ("children" in item) {
    return item.children.reduce((total, child) => total + computeSum(child), 0)
  } else {
    return item.sum
  }
}

export function MyTreeView() {
  const {data, updateEntry, updateEntryName, deleteEntry, isLoading} = useTreeDataContext()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingNameId, setEditingNameId] = useState<string | null>(null)
  const [treeData, setTreeData] = useState<TreeDataItem | null>(null)

  const handleSumUpdate = (path: string[], newSum: number) => {
    console.log("Updating sum:", path, newSum)
    updateEntry(path, newSum)
    setEditingId(null) // Stop editing after save
  }

  const handleNameUpdate = (path: string[], newName: string) => {
    console.log("Updating name:", path, newName)
    updateEntryName(path, newName)
    setEditingNameId(null) // Stop editing after save
  }

  const handleDelete = (path: string[]) => {
    console.log("Deleting entry:", path)
    deleteEntry(path)
    setEditingId(null) // Stop editing after delete
  }

  const transformToTreeData = (
    item: Section | Entry,
    parentPath: string[] = [],
    originalPath: string[] = []
  ): TreeDataItem => {
    // Use stable ID based on position in tree, not name (to prevent collapse on rename)
    const stableId =
      originalPath.length > 0
        ? originalPath.join("/").toLowerCase().replace(/\s+/g, "-")
        : [...parentPath, item.name].join("/").toLowerCase().replace(/\s+/g, "-")
    const id = stableId
    const currentPath = [...parentPath, item.name]
    // For context operations, adjust path based on level
    // Root level (Annual Report): use empty array []
    // First level (Sales, Marketing): use [item.name]
    // Deeper levels: use path without root
    const contextPath = parentPath.length === 0 ? [] : currentPath.slice(1)

    if ("children" in item) {
      // It's a Section - show name with computed total, name is clickable for editing
      const totalSum = computeSum(item)
      const isEditingName = editingNameId === id

      // Create clickable name for editing (sections too!)
      const nameDisplay = isEditingName ? (
        <EditableInput
          value={item.name}
          onSave={(newName) => handleNameUpdate(contextPath, newName as string)}
          type='text'
          className='w-auto min-w-20'
        />
      ) : (
        <span
          onClick={(e) => {
            e.stopPropagation()
            console.log(
              "Section name clicked for editing:",
              currentPath,
              "contextPath:",
              contextPath
            )
            setEditingNameId(id)
          }}
          className='cursor-pointer hover:bg-gray-100 px-1 rounded'
        >
          {item.name}
        </span>
      )

      return {
        id,
        name: (
          <div className='flex items-center gap-1'>
            {nameDisplay}
            <span>({totalSum})</span>
          </div>
        ),
        children: item.children.map((child, index) =>
          transformToTreeData(child, currentPath, [...currentPath, `child-${index}`])
        )
      }
    } else {
      // It's an Entry - show name with sum, show edit and delete buttons on hover
      const isEditing = editingId === id
      const isEditingName = editingNameId === id

      // Create clickable name for editing
      const nameDisplay = isEditingName ? (
        <EditableInput
          value={item.name}
          onSave={(newName) => handleNameUpdate(contextPath, newName as string)}
          type='text'
          className='w-auto min-w-20'
        />
      ) : (
        <span
          onClick={(e) => {
            e.stopPropagation()
            console.log("Name clicked for editing:", currentPath, "contextPath:", contextPath)
            setEditingNameId(id)
          }}
          className='cursor-pointer hover:bg-gray-100 px-1 rounded'
        >
          {item.name}
        </span>
      )

      return {
        id,
        name: (
          <div className='flex items-center gap-1'>
            {nameDisplay}
            <span>({item.sum})</span>
          </div>
        ),
        actions: isEditing ? (
          <EditableInput
            value={item.sum}
            onSave={(newSum) => handleSumUpdate(contextPath, newSum as number)}
            type='number'
          />
        ) : (
          <div className='flex gap-1 items-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity'>
            <button
              onClick={(e) => {
                e.stopPropagation()
                console.log("Edit clicked for:", currentPath, "contextPath:", contextPath)
                setEditingId(id)
              }}
              className='text-black hover:text-gray-600 text-xs px-1 py-0.5 rounded hover:bg-gray-100 border border-gray-300 cursor-pointer'
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                console.log("Delete clicked for:", currentPath, "contextPath:", contextPath)
                handleDelete(contextPath)
              }}
              className='text-black hover:text-gray-600 text-xs px-1 py-0.5 rounded hover:bg-gray-100 border border-gray-300 cursor-pointer'
            >
              ×
            </button>
          </div>
        )
      }
    }
  }

  // Use useEffect to update tree data when context data changes
  useEffect(() => {
    console.log("TreeView useEffect triggered, data:", data)
    if (data) {
      const transformed = transformToTreeData(data, [], ["root"])
      setTreeData(transformed)

      console.log("TreeView data transformed:", transformed)
    }
  }, [data, editingId, editingNameId]) // Re-transform when data or editing state changes

  if (isLoading || !treeData) {
    return <div>Loading...</div>
  }

  return (
    <div className='w-full'>
      <TreeView data={treeData} className='w-full border rounded-lg p-4' expandAll={true} />
    </div>
  )
}
