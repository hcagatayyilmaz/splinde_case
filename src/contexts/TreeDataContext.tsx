"use client"

import React, {createContext, useContext, useState, useEffect, ReactNode} from "react"
import axios from "axios"
import {Section, Entry} from "@/constants/types"
import {demoData} from "@/constants/data"

interface TreeDataContextType {
  data: Section | null
  updateEntry: (path: string[], newSum: number) => void
  updateEntryName: (path: string[], newName: string) => void
  deleteEntry: (path: string[]) => void
  setData: (data: Section | null) => void
  isLoading: boolean
}

const TreeDataContext = createContext<TreeDataContextType | undefined>(undefined)

interface TreeDataProviderProps {
  children: ReactNode
  initialData?: Section
}

export function TreeDataProvider({children, initialData}: TreeDataProviderProps) {
  const [data, setData] = useState<Section | null>(initialData || null)
  const [isLoading, setIsLoading] = useState(!initialData)

  // Fetch data
  useEffect(() => {
    if (!initialData) {
      const fetchData = async () => {
        try {
          //
          const response = await axios.get("http://localhost:3000/api/sections", {
            timeout: 5000 // 5 second timeout
          })

          setData(response.data)
          console.log("Data fetched successfully from API")
        } catch (error) {
          console.log("API fetch failed", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [initialData])

  const updateEntry = (path: string[], newSum: number): void => {
    if (!data) return
    console.log("Context updateEntry called:", path, newSum)

    const updateEntrySum = (data: Section, path: string[], newSum: number): Section => {
      if (path.length === 1) {
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

    const newData = data ? updateEntrySum(data, path, newSum) : null
    console.log("Context setting new data:", newData)
    setData(newData)
  }

  const updateEntryName = (path: string[], newName: string): void => {
    if (!data) return
    console.log(
      "Context updateEntryName called for:",
      path.length === 0 ? "ROOT" : path.join(" > "),
      "new name:",
      newName
    )

    const updateEntryNameRecursive = (data: Section, path: string[], newName: string): Section => {
      // Handle root level name change
      if (path.length === 0) {
        return {
          ...data,
          name: newName
        }
      }

      if (path.length === 1) {
        return {
          ...data,
          children: data.children.map((child) => {
            if (child.name === path[0]) {
              return {...child, name: newName}
            }
            return child
          })
        }
      } else {
        return {
          ...data,
          children: data.children.map((child) => {
            if (child.name === path[0] && "children" in child) {
              return updateEntryNameRecursive(child, path.slice(1), newName)
            }
            return child
          })
        }
      }
    }

    const newData = data ? updateEntryNameRecursive(data, path, newName) : null
    console.log("Context setting new data after name update:", newData)
    setData(newData)
  }

  const deleteEntry = (path: string[]): void => {
    if (!data) return
    console.log("Context deleteEntry called:", path)

    const deleteEntryFromData = (data: Section, path: string[]): Section => {
      if (path.length === 1) {
        return {
          ...data,
          children: data.children.filter((child) => child.name !== path[0])
        }
      } else {
        return {
          ...data,
          children: data.children.map((child) => {
            if (child.name === path[0] && "children" in child) {
              return deleteEntryFromData(child, path.slice(1))
            }
            return child
          })
        }
      }
    }

    const newData = data ? deleteEntryFromData(data, path) : null
    console.log("Context setting new data after delete:", newData)
    setData(newData)
  }

  return (
    <TreeDataContext.Provider
      value={{data, updateEntry, updateEntryName, deleteEntry, setData, isLoading}}
    >
      {children}
    </TreeDataContext.Provider>
  )
}

export function useTreeDataContext() {
  const context = useContext(TreeDataContext)
  if (context === undefined) {
    throw new Error("useTreeDataContext must be used within a TreeDataProvider")
  }
  return context
}
