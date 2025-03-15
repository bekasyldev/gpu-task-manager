import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-card px-4 py-6">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link 
              href="/" 
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/tasks" 
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Tasks
            </Link>
          </li>
          <li>
            <Link 
              href="/agents" 
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Agents
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}