import {MyTreeView} from "./components/TreeView"
import {TreeDataProvider} from "@/contexts/TreeDataContext"

export default function Home() {
  return (
    <TreeDataProvider>
      <div className='container mx-auto p-8 max-w-4xl'>
        <h1 className='text-3xl font-bold mb-6'>Annual Report Tree View</h1>
        <p className='text-muted-foreground mb-6'>
          Expand sections to view detailed entries with their sums
        </p>
        <MyTreeView />
      </div>
    </TreeDataProvider>
  )
}
