# Details

I used Next.js for fullstack development of the platform. Since the case is mostly about client-side rendering, I think a single endpoint which fetches data is enough. So I chose Next.js which is a fullstack framework using React and TypeScript. So it is satisfying the requirements. Also the app is containerized and added to docker-compose file in a simplistic setup.

Detail of development: for design I used shadcn as component library since it enables us to import specific components without need to import the whole library. It has a tree view component which I used as UI component inside TreeView custom component. It supports the following features. The whole design is responsive. Rendering is client-side heavy so there is no persistent data storage including database, local storage or session storage. I used Context API for state management.

Development made by AI-assisted way by using Cursor, Claude-4-Sonnet and GPT-4.1

## Features

Interactive Tree View: Navigate through hierarchical data
Edit Values: Click "Edit" to modify entry values
Edit Names: Click any name to rename sections/entries
Delete Entries: Click "×" to remove entries
Auto-computed Sums: Parent totals update automatically
Responsive Design: Works on desktop and mobile
Context API: Shared state management

## Next Steps

Adding TanStack React Query for better data fetching.

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

## Features

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
