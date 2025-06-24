"use client"

import {useState} from "react"
import {TreeView, type TreeDataItem} from "@/app/ui/components/tree-view"
import {Section, Entry} from "@/data/types"
import {EditableInput} from "./EditableInput"

function computeSum(item: Section | Entry): number {
  if ("children" in item) {
    return item.children.reduce((total, child) => total + computeSum(child), 0)
  } else {
    return item.sum
  }
}

function updateEntrySum(data: Section, path: string[], newSum: number): Section {
  if (path.length === 1) {
    // We're at the target level, find and update the entry
    return {
      ...data,
      children: data.children.map((child) => {
        if (child.name === path[0] && "sum" in child) {
          return {...child, sum: newSum}
        }
        return child
      })
    }
  } else {
    // Continue traversing down the path
    return {
      ...data,
      children: data.children.map((child) => {
        if (child.name === path[0] && "children" in child) {
          return updateEntrySum(child, path.slice(1), newSum)
        }
        return child
      })
    }
  }
}

interface MyTreeViewProps {
  data: Section
}

export function MyTreeView({data: initialData}: MyTreeViewProps) {
  const [data, setData] = useState(initialData)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleSumUpdate = (path: string[], newSum: number) => {
    const updatedData = updateEntrySum(data, path, newSum)
    setData(updatedData)
    setEditingId(null) // Stop editing after save
  }

  const transformToTreeData = (item: Section | Entry, parentPath: string[] = []): TreeDataItem => {
    const id = [...parentPath, item.name].join("/").toLowerCase().replace(/\s+/g, "-")
    const currentPath = [...parentPath, item.name]

    if ("children" in item) {
      // It's a Section - show name with computed total (not editable)
      const totalSum = computeSum(item)
      return {
        id,
        name: `${item.name} (${totalSum})`,
        children: item.children.map((child) => transformToTreeData(child, currentPath))
      }
    } else {
      // It's an Entry - show name with sum, clickable to edit
      const isEditing = editingId === id

      return {
        id,
        name: `${item.name} (${item.sum})`,
        actions: isEditing ? (
          <EditableInput
            value={item.sum}
            onSave={(newSum) => handleSumUpdate(currentPath, newSum)}
          />
        ) : undefined,
        onClick: () => {
          if (!isEditing) {
            setEditingId(id)
          }
        }
      }
    }
  }

  const treeData = transformToTreeData(data)

  return (
    <div className='w-full'>
      <TreeView data={treeData} className='w-full border rounded-lg p-4' expandAll={true} />
    </div>
  )
}
