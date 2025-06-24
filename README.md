# Details

So in this case, I used Next.js for fullstack development of the platform. Since the case is mostly about client-side rendering, I think a single endpoint which fetches data is enough. So I chose Next.js which is a fullstack framework using React and TypeScript. So it is satisfying the requirements. Also the app is containerized and added to docker-compose file in a simplistic setup.

Detail of development: for design I used shadcn as component library since it enables us to import specific components without need to import the whole library. It has a tree view component which I used as UI component inside TreeView custom component. It supports the following features. The whole design is responsive. Rendering is client-side heavy so there is no persistent data storage including database, local storage or session storage. I used Context API for state management.

Update Name

- Users can update name of the section/entry by clicking and then editing
  Update Value
- User can update the value of the entry by clicking
  Delete Entry
- User can delete entry
  Update UI
- For each change, UI is expected to automatically update with new change.

Next Steps

- Adding TanStack React Query

Development made by AI-assisted way by using Cursor, Claude-4-Sonnet and GPT-4.1

## 🚀 Running the Project

### Method 1: Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Method 2: Docker

```bash
# Build and run with Docker
docker build -t tree-view-app .
docker run -p 3000:3000 tree-view-app
```

### Method 3: Docker Compose (Recommended)

```bash
# Build and run with docker-compose
docker-compose up --build
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## ✨ Features

- **Interactive Tree View**: Navigate through hierarchical data
- **Edit Values**: Click "Edit" to modify entry values
- **Edit Names**: Click any name to rename sections/entries
- **Delete Entries**: Click "×" to remove entries
- **Auto-computed Sums**: Parent totals update automatically
- **Responsive Design**: Works on desktop and mobile
- **Context API**: Shared state management

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **UI Components**: Shadcn/ui with Tree View
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Containerization**: Docker & Docker Compose

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
