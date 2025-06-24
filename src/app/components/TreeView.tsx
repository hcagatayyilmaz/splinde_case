"use client"

// Import the shadcn component
import {TreeView, type TreeDataItem} from "@/app/ui/components/tree-view"
import {Section, Entry} from "@/data/types"

function computeSum(item: Section | Entry): number {
  if ("children" in item) {
    // It's a Section - sum all children recursively
    return item.children.reduce((total, child) => total + computeSum(child), 0)
  } else {
    // It's an Entry - return its sum value
    return item.sum
  }
}

// Create a function to transform your data
function transformToTreeData(item: Section | Entry, parentPath = ""): TreeDataItem {
  const id = parentPath
    ? `${parentPath}/${item.name.toLowerCase().replace(/\s+/g, "-")}`
    : item.name.toLowerCase().replace(/\s+/g, "-")

  const totalSum = computeSum(item)

  // Check if item is a Section (has children) or Entry (has sum)
  if ("children" in item) {
    // It's a Section
    return {
      id,
      name: `${item.name} (${totalSum})`,
      children: item.children.map((child) => transformToTreeData(child, id))
    }
  } else {
    // It's an Entry
    return {
      id,
      name: `${item.name} (${item.sum})`
    }
  }
}

interface MyTreeViewProps {
  data: Section
}

// Create your component
export function MyTreeView({data}: MyTreeViewProps) {
  const treeData = transformToTreeData(data)

  return (
    <div className='w-full'>
      <TreeView data={treeData} className='w-full border rounded-lg p-4' />
    </div>
  )
}
