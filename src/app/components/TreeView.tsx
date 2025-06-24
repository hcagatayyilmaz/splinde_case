"use client"

import {useState, useEffect} from "react"
import {TreeView, type TreeDataItem} from "@/app/ui/components/tree-view"
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
  const {data, updateEntry, deleteEntry, isLoading} = useTreeDataContext()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [treeData, setTreeData] = useState<TreeDataItem | null>(null)

  const handleSumUpdate = (path: string[], newSum: number) => {
    console.log("Updating sum:", path, newSum)
    updateEntry(path, newSum)
    setEditingId(null) // Stop editing after save
  }

  const handleDelete = (path: string[]) => {
    console.log("Deleting entry:", path)
    deleteEntry(path)
    setEditingId(null) // Stop editing after delete
  }

  const transformToTreeData = (item: Section | Entry, parentPath: string[] = []): TreeDataItem => {
    const id = [...parentPath, item.name].join("/").toLowerCase().replace(/\s+/g, "-")
    const currentPath = [...parentPath, item.name]
    // For context operations, skip the root name since context.data IS the root
    const contextPath = currentPath.slice(1) // Remove the first element (root name)

    if ("children" in item) {
      // It's a Section - show name with computed total (not editable)
      const totalSum = computeSum(item)
      return {
        id,
        name: `${item.name} (${totalSum})`,
        children: item.children.map((child) => transformToTreeData(child, currentPath))
      }
    } else {
      // It's an Entry - show name with sum, show edit and delete buttons on hover
      const isEditing = editingId === id

      return {
        id,
        name: `${item.name} (${item.sum})`,
        actions: isEditing ? (
          <EditableInput
            value={item.sum}
            onSave={(newSum) => handleSumUpdate(contextPath, newSum)}
          />
        ) : (
          <div className='flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity'>
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
      const transformed = transformToTreeData(data)
      setTreeData(transformed)

      console.log("TreeView data transformed:", transformed)
    }
  }, [data, editingId]) // Re-transform when data or editing state changes

  if (isLoading || !treeData) {
    return <div>Loading...</div>
  }

  return (
    <div className='w-full'>
      <TreeView data={treeData} className='w-full border rounded-lg p-4' />
    </div>
  )
}
