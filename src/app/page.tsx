import {MyTreeView} from "./components/TreeView"
import {Section} from "@/data/types"

async function getData(): Promise<Section> {
  const res = await fetch("http://localhost:3000/api/sections", {
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function Home() {
  const data = await getData()

  return (
    <div className='container mx-auto p-8 max-w-4xl'>
      <h1 className='text-3xl font-bold mb-6'>Annual Report Tree View</h1>
      <p className='text-muted-foreground mb-6'>
        Expand sections to view detailed entries with their sums
      </p>
      <MyTreeView data={data} />
    </div>
  )
}
