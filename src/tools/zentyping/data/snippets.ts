import { LanguageMode, Snippet } from '../types/game';

export const SNIPPETS: Snippet[] = [
  {
    id: 'js-1',
    title: 'Array Filter Pipeline',
    language: 'javascript',
    difficulty: 'easy',
    themes: ['frontend', 'bugfix'],
    code: `const visibleTodos = todos
  .filter((todo) => !todo.done)
  .map((todo) => ({ ...todo, label: todo.title.trim() }));`,
  },
  {
    id: 'js-2',
    title: 'Fetch Profile',
    language: 'javascript',
    difficulty: 'easy',
    themes: ['frontend', 'backend'],
    code: `async function loadProfile(userId) {
  const res = await fetch('/api/users/' + userId);
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}`,
  },
  {
    id: 'js-3',
    title: 'Debounce Helper',
    language: 'javascript',
    difficulty: 'medium',
    themes: ['frontend', 'bugfix'],
    code: `function debounce(fn, wait = 180) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}`,
  },
  {
    id: 'js-4',
    title: 'Aggregate Totals',
    language: 'javascript',
    difficulty: 'medium',
    themes: ['backend', 'bugfix'],
    code: `const totalByCurrency = orders.reduce((acc, order) => {
  const key = order.currency ?? 'USD';
  acc[key] = (acc[key] ?? 0) + order.total;
  return acc;
}, {});`,
  },
  {
    id: 'js-5',
    title: 'Retry Request',
    language: 'javascript',
    difficulty: 'hard',
    themes: ['backend', 'chaos'],
    code: `async function retryRequest(task, attempts = 3) {
  for (let i = 1; i <= attempts; i += 1) {
    try {
      return await task();
    } catch (error) {
      if (i === attempts) throw error;
    }
  }
}`,
  },
  {
    id: 'js-6',
    title: 'Nested Optional Access',
    language: 'javascript',
    difficulty: 'hard',
    themes: ['bugfix', 'chaos'],
    code: `const city = response?.data?.user?.addresses?.find(
  (entry) => entry.primary === true,
)?.city ?? 'Unknown';`,
  },
  {
    id: 'js-7',
    title: 'Keydown Shortcut',
    language: 'javascript',
    difficulty: 'medium',
    themes: ['frontend', 'devops'],
    code: `window.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openCommandPalette();
  }
});`,
  },
  {
    id: 'js-8',
    title: 'Promise Batch',
    language: 'javascript',
    difficulty: 'hard',
    themes: ['backend', 'devops'],
    code: `const [users, teams, roles] = await Promise.all([
  fetch('/api/users').then((r) => r.json()),
  fetch('/api/teams').then((r) => r.json()),
  fetch('/api/roles').then((r) => r.json()),
]);`,
  },
  {
    id: 'ts-1',
    title: 'Interface Shape',
    language: 'typescript',
    difficulty: 'easy',
    themes: ['frontend', 'backend'],
    code: `interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

const currentUser: User = { id: 'u_01', email: 'dev@zen.app', isAdmin: false };`,
  },
  {
    id: 'ts-2',
    title: 'Generic Identity',
    language: 'typescript',
    difficulty: 'easy',
    themes: ['frontend', 'bugfix'],
    code: `function identity<T>(value: T): T {
  return value;
}

const score = identity<number>(1200);`,
  },
  {
    id: 'ts-3',
    title: 'Union Guard',
    language: 'typescript',
    difficulty: 'medium',
    themes: ['backend', 'bugfix'],
    code: `type ApiError = { message: string; status: number };
type ApiSuccess = { data: string[]; status: number };

type ApiResponse = ApiError | ApiSuccess;

function isError(res: ApiResponse): res is ApiError {
  return 'message' in res;
}`,
  },
  {
    id: 'ts-4',
    title: 'Mapped Type',
    language: 'typescript',
    difficulty: 'medium',
    themes: ['frontend', 'backend'],
    code: `type Flags<T> = {
  [K in keyof T]: boolean;
};

type FeatureFlags = Flags<{
  newSidebar: string;
  betaSearch: string;
}>;`,
  },
  {
    id: 'ts-5',
    title: 'Discriminated Union',
    language: 'typescript',
    difficulty: 'hard',
    themes: ['backend', 'chaos'],
    code: `type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: Error };

function unwrap<T>(result: Result<T>): T {
  if (!result.ok) throw result.error;
  return result.value;
}`,
  },
  {
    id: 'ts-6',
    title: 'Conditional Infer',
    language: 'typescript',
    difficulty: 'hard',
    themes: ['bugfix', 'chaos'],
    code: `type ExtractPromise<T> = T extends Promise<infer U> ? U : T;

type Payload = ExtractPromise<Promise<{ id: string; ttl: number }>>;`,
  },
  {
    id: 'ts-7',
    title: 'Store Class',
    language: 'typescript',
    difficulty: 'medium',
    themes: ['frontend', 'devops'],
    code: `interface Store<T> {
  get(): T;
  set(next: T): void;
}

class MemoryStore<T> implements Store<T> {
  constructor(private value: T) {}
  get() { return this.value; }
  set(next: T) { this.value = next; }
}`,
  },
  {
    id: 'ts-8',
    title: 'Constraint Function',
    language: 'typescript',
    difficulty: 'hard',
    themes: ['backend', 'devops'],
    code: `function pluck<T extends object, K extends keyof T>(
  source: T,
  keys: K[],
): Pick<T, K> {
  return keys.reduce((acc, key) => {
    acc[key] = source[key];
    return acc;
  }, {} as Pick<T, K>);
}`,
  },
  {
    id: 'py-1',
    title: 'List Comprehension',
    language: 'python',
    difficulty: 'easy',
    themes: ['backend', 'bugfix'],
    code: `numbers = [1, 2, 3, 4, 5, 6]
odd_squares = [n * n for n in numbers if n % 2 == 1]
print(odd_squares)`,
  },
  {
    id: 'py-2',
    title: 'Normalize Name',
    language: 'python',
    difficulty: 'easy',
    themes: ['backend', 'frontend'],
    code: `def normalize_name(first: str, last: str) -> str:
    return f"{first.strip().title()} {last.strip().title()}"

print(normalize_name("  an  ", "nguyen"))`,
  },
  {
    id: 'py-3',
    title: 'Count Events',
    language: 'python',
    difficulty: 'medium',
    themes: ['backend', 'devops'],
    code: `events = ["deploy", "deploy", "rollback", "deploy"]
stats = {}
for event in events:
    stats[event] = stats.get(event, 0) + 1
print(stats)`,
  },
  {
    id: 'py-4',
    title: 'Chunk Generator',
    language: 'python',
    difficulty: 'medium',
    themes: ['backend', 'bugfix'],
    code: `from typing import Iterable

def chunks(data: Iterable[int], size: int):
    bucket = []
    for value in data:
        bucket.append(value)
        if len(bucket) == size:
            yield bucket
            bucket = []`,
  },
  {
    id: 'py-5',
    title: 'Context Timer',
    language: 'python',
    difficulty: 'hard',
    themes: ['devops', 'chaos'],
    code: `from time import perf_counter

class Timer:
    def __enter__(self):
        self.start = perf_counter()
        return self

    def __exit__(self, exc_type, exc, tb):
        print(f"elapsed={perf_counter() - self.start:.3f}s")`,
  },
  {
    id: 'py-6',
    title: 'Retry Async',
    language: 'python',
    difficulty: 'hard',
    themes: ['backend', 'chaos'],
    code: `import asyncio

async def retry(task, attempts=3):
    for step in range(1, attempts + 1):
        try:
            return await task()
        except Exception:
            if step == attempts:
                raise
            await asyncio.sleep(0.1 * step)`,
  },
  {
    id: 'py-7',
    title: 'Sort by Score',
    language: 'python',
    difficulty: 'medium',
    themes: ['backend', 'frontend'],
    code: `players = [
    {"name": "Ari", "score": 1800},
    {"name": "Bo", "score": 1200},
    {"name": "Kai", "score": 2200},
]
ranked = sorted(players, key=lambda p: p["score"], reverse=True)`,
  },
  {
    id: 'py-8',
    title: 'Dataclass Decode',
    language: 'python',
    difficulty: 'hard',
    themes: ['backend', 'bugfix'],
    code: `from dataclasses import dataclass

@dataclass
class Session:
    id: str
    ttl: int

payload = {"id": "s_22", "ttl": 3600}
session = Session(**payload)`,
  },
  {
    id: 'sql-1',
    title: 'Recent Orders',
    language: 'sql',
    difficulty: 'easy',
    themes: ['backend', 'bugfix'],
    code: `SELECT id, customer_id, total
FROM orders
WHERE created_at >= CURRENT_DATE - INTERVAL '7 day'
ORDER BY total DESC
LIMIT 10;`,
  },
  {
    id: 'sql-2',
    title: 'Join Users Teams',
    language: 'sql',
    difficulty: 'easy',
    themes: ['backend', 'frontend'],
    code: `SELECT u.id, u.email, t.name AS team_name
FROM users u
LEFT JOIN teams t ON t.id = u.team_id
WHERE u.is_active = TRUE;`,
  },
  {
    id: 'sql-3',
    title: 'Revenue by Month',
    language: 'sql',
    difficulty: 'medium',
    themes: ['backend', 'devops'],
    code: `SELECT DATE_TRUNC('month', paid_at) AS month,
       SUM(amount) AS revenue
FROM invoices
WHERE status = 'paid'
GROUP BY month
HAVING SUM(amount) > 1000
ORDER BY month;`,
  },
  {
    id: 'sql-4',
    title: 'Window Rank',
    language: 'sql',
    difficulty: 'medium',
    themes: ['backend', 'bugfix'],
    code: `SELECT player_id,
       score,
       DENSE_RANK() OVER (ORDER BY score DESC) AS rank
FROM leaderboard
WHERE season = '2026-spring';`,
  },
  {
    id: 'sql-5',
    title: 'Recursive Tree',
    language: 'sql',
    difficulty: 'hard',
    themes: ['backend', 'chaos'],
    code: `WITH RECURSIVE category_tree AS (
  SELECT id, parent_id, name, 0 AS depth
  FROM categories
  WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.parent_id, c.name, ct.depth + 1
  FROM categories c
  JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree;`,
  },
  {
    id: 'sql-6',
    title: 'Transactional Update',
    language: 'sql',
    difficulty: 'hard',
    themes: ['bugfix', 'devops'],
    code: `BEGIN;
UPDATE accounts
SET balance = balance - 120
WHERE id = 'acct_sender';

UPDATE accounts
SET balance = balance + 120
WHERE id = 'acct_receiver';
COMMIT;`,
  },
  {
    id: 'sql-7',
    title: 'JSON Query',
    language: 'sql',
    difficulty: 'medium',
    themes: ['backend', 'frontend'],
    code: `SELECT id,
       settings ->> 'theme' AS active_theme,
       settings -> 'shortcuts' AS shortcuts
FROM user_preferences
WHERE settings ->> 'theme' = 'neon';`,
  },
  {
    id: 'sql-8',
    title: 'Upsert Snapshot',
    language: 'sql',
    difficulty: 'hard',
    themes: ['backend', 'devops'],
    code: `INSERT INTO daily_stats (date_key, active_users, crash_count)
VALUES ('2026-03-13', 923, 2)
ON CONFLICT (date_key)
DO UPDATE SET
  active_users = EXCLUDED.active_users,
  crash_count = EXCLUDED.crash_count
RETURNING *;`,
  },
  {
    id: 'json-1',
    title: 'Simple Package Manifest',
    language: 'json',
    difficulty: 'easy',
    themes: ['frontend', 'backend'],
    code: `{
  "name": "zentype",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}`,
  },
  {
    id: 'json-2',
    title: 'User API Payload',
    language: 'json',
    difficulty: 'easy',
    themes: ['backend', 'frontend'],
    code: `{
  "id": "u_204",
  "username": "codepulse",
  "badges": ["starter", "verified"],
  "stats": {
    "wpm": 76,
    "accuracy": 98.4
  }
}`,
  },
  {
    id: 'json-3',
    title: 'Dashboard Widgets',
    language: 'json',
    difficulty: 'medium',
    themes: ['frontend', 'bugfix'],
    code: `{
  "layout": "grid",
  "widgets": [
    { "id": "speed", "size": "lg", "visible": true },
    { "id": "accuracy", "size": "md", "visible": true },
    { "id": "errors", "size": "sm", "visible": false }
  ]
}`,
  },
  {
    id: 'json-4',
    title: 'Pipeline Config',
    language: 'json',
    difficulty: 'medium',
    themes: ['devops', 'backend'],
    code: `{
  "pipeline": {
    "name": "deploy-main",
    "steps": [
      { "name": "install", "run": "npm ci" },
      { "name": "test", "run": "npm run lint" },
      { "name": "release", "run": "npm run build" }
    ]
  }
}`,
  },
  {
    id: 'json-5',
    title: 'Feature Flags Tree',
    language: 'json',
    difficulty: 'hard',
    themes: ['chaos', 'frontend'],
    code: `{
  "flags": {
    "newEditor": {
      "enabled": true,
      "rollout": { "percent": 35, "region": ["us", "apac"] },
      "guards": {
        "requires": ["beta_user", "has_gpu"],
        "fallback": "classic_editor"
      }
    }
  }
}`,
  },
  {
    id: 'json-6',
    title: 'VSCode Settings',
    language: 'json',
    difficulty: 'hard',
    themes: ['frontend', 'devops'],
    code: `{
  "editor.fontFamily": "JetBrains Mono",
  "editor.fontLigatures": true,
  "editor.minimap.enabled": false,
  "terminal.integrated.defaultProfile.osx": "zsh",
  "files.exclude": {
    "**/.DS_Store": true,
    "**/node_modules": true
  }
}`,
  },
  {
    id: 'json-7',
    title: 'Compose Service',
    language: 'json',
    difficulty: 'medium',
    themes: ['devops', 'backend'],
    code: `{
  "service": "api",
  "image": "node:22-alpine",
  "ports": ["3000:3000"],
  "environment": {
    "NODE_ENV": "development",
    "LOG_LEVEL": "debug"
  }
}`,
  },
  {
    id: 'json-8',
    title: 'Event Contract',
    language: 'json',
    difficulty: 'hard',
    themes: ['backend', 'chaos'],
    code: `{
  "event": "user.session.expired",
  "version": 3,
  "payload": {
    "sessionId": "s_9981",
    "expiredAt": "2026-03-13T11:04:00Z",
    "metadata": {
      "reason": "ttl_reached",
      "source": "edge-node-4",
      "attempts": [1, 2, 3]
    }
  }
}`,
  },
  {
    id: 'term-1',
    title: 'Bootstrap Commands',
    language: 'terminal',
    difficulty: 'easy',
    themes: ['devops', 'frontend'],
    code: `npm install
npm run dev
npm run lint`,
  },
  {
    id: 'term-2',
    title: 'Git Hotfix Flow',
    language: 'terminal',
    difficulty: 'easy',
    themes: ['bugfix', 'backend'],
    code: `git checkout -b hotfix/login-race
git add .
git commit -m "fix: handle stale auth token"
git push origin hotfix/login-race`,
  },
  {
    id: 'term-3',
    title: 'Log Search',
    language: 'terminal',
    difficulty: 'medium',
    themes: ['devops', 'bugfix'],
    code: `find ./logs -name "*.log" -print0 \
  | xargs -0 grep -n "timeout" \
  | sort -t: -k1,1 -k2,2n`,
  },
  {
    id: 'term-4',
    title: 'Docker Quick Run',
    language: 'terminal',
    difficulty: 'medium',
    themes: ['devops', 'backend'],
    code: `docker build -t zentype:dev .
docker run --rm -it -p 3000:3000 \
  -e NODE_ENV=development zentype:dev`,
  },
  {
    id: 'term-5',
    title: 'Trace Slow API',
    language: 'terminal',
    difficulty: 'hard',
    themes: ['bugfix', 'chaos'],
    code: `curl -sS "https://api.zen.dev/v1/health" \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.checks[] | select(.latency_ms > 300)'`,
  },
  {
    id: 'term-6',
    title: 'Kubernetes Rollout',
    language: 'terminal',
    difficulty: 'hard',
    themes: ['devops', 'backend'],
    code: `kubectl set image deployment/zentype-web web=ghcr.io/zen/web:1.8.2
kubectl rollout status deployment/zentype-web --timeout=120s
kubectl get pods -l app=zentype-web -o wide`,
  },
  {
    id: 'term-7',
    title: 'SQLite Backup',
    language: 'terminal',
    difficulty: 'medium',
    themes: ['devops', 'bugfix'],
    code: `mkdir -p backups
sqlite3 db/main.sqlite ".backup 'backups/main-$(date +%Y%m%d).sqlite'"
ls -lah backups`,
  },
  {
    id: 'term-8',
    title: 'Awk Metrics',
    language: 'terminal',
    difficulty: 'hard',
    themes: ['devops', 'chaos'],
    code: `awk -F"," 'NR>1 {sum+=$5; count++} END {printf "avg=%.2f\\n", sum/count}' metrics.csv \
  | sed 's/avg=/average_latency_ms=/'`,
  },
  {
    id: 'react-1',
    title: 'Controlled Input',
    language: 'react',
    difficulty: 'easy',
    themes: ['frontend', 'bugfix'],
    code: `function SearchBox() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}`,
  },
  {
    id: 'react-2',
    title: 'Deferred Filter',
    language: 'react',
    difficulty: 'medium',
    themes: ['frontend', 'devops'],
    code: `const deferredQuery = useDeferredValue(query);
const visible = items.filter((item) =>
  item.name.toLowerCase().includes(deferredQuery.toLowerCase()),
);`,
  },
  {
    id: 'nextjs-1',
    title: 'Server Component Fetch',
    language: 'nextjs',
    difficulty: 'easy',
    themes: ['frontend', 'backend'],
    code: `export default async function Page() {
  const res = await fetch('https://api.example.dev/posts', { cache: 'no-store' });
  const posts = await res.json();
  return <PostList posts={posts} />;
}`,
  },
  {
    id: 'nextjs-2',
    title: 'Route Handler',
    language: 'nextjs',
    difficulty: 'medium',
    themes: ['backend', 'bugfix'],
    code: `export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit') ?? '20');
  return Response.json({ limit, ok: true });
}`,
  },
  {
    id: 'vue-1',
    title: 'Computed Total',
    language: 'vue',
    difficulty: 'easy',
    themes: ['frontend', 'bugfix'],
    code: `const cart = ref([{ price: 12, qty: 2 }, { price: 8, qty: 1 }]);
const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.qty, 0),
);`,
  },
  {
    id: 'vue-2',
    title: 'Watch Route',
    language: 'vue',
    difficulty: 'medium',
    themes: ['frontend', 'devops'],
    code: `watch(
  () => route.params.id,
  async (id) => {
    profile.value = await api.getUser(String(id));
  },
  { immediate: true },
);`,
  },
  {
    id: 'angular-1',
    title: 'Signal State',
    language: 'angular',
    difficulty: 'easy',
    themes: ['frontend', 'bugfix'],
    code: `readonly count = signal(0);
readonly doubled = computed(() => this.count() * 2);

increment() {
  this.count.update((value) => value + 1);
}`,
  },
  {
    id: 'angular-2',
    title: 'HTTP Service',
    language: 'angular',
    difficulty: 'medium',
    themes: ['frontend', 'backend'],
    code: `getProjects() {
  return this.http.get<Project[]>('/api/projects').pipe(
    catchError(() => of([])),
  );
}`,
  },
  {
    id: 'svelte-1',
    title: 'Derived Store',
    language: 'svelte',
    difficulty: 'easy',
    themes: ['frontend', 'bugfix'],
    code: `const count = writable(0);
const doubled = derived(count, ($count) => $count * 2);

function increment() {
  count.update((value) => value + 1);
}`,
  },
  {
    id: 'svelte-2',
    title: 'Reactive Filter',
    language: 'svelte',
    difficulty: 'medium',
    themes: ['frontend', 'devops'],
    code: `let query = '';
let users = [];
$: filtered = users.filter((user) =>
  user.name.toLowerCase().includes(query.toLowerCase()),
);`,
  },
  {
    id: 'node-1',
    title: 'Read JSON Config',
    language: 'node',
    difficulty: 'easy',
    themes: ['backend', 'devops'],
    code: `import { readFile } from 'node:fs/promises';

const raw = await readFile('./config.json', 'utf8');
const config = JSON.parse(raw);
console.log(config.appName);`,
  },
  {
    id: 'node-2',
    title: 'Process Signals',
    language: 'node',
    difficulty: 'medium',
    themes: ['backend', 'chaos'],
    code: `process.on('SIGTERM', async () => {
  await server.close();
  await db.disconnect();
  process.exit(0);
});`,
  },
  {
    id: 'express-1',
    title: 'Health Route',
    language: 'express',
    difficulty: 'easy',
    themes: ['backend', 'devops'],
    code: `app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, uptime: process.uptime() });
});`,
  },
  {
    id: 'express-2',
    title: 'Error Middleware',
    language: 'express',
    difficulty: 'medium',
    themes: ['backend', 'bugfix'],
    code: `app.use((error, _req, res, _next) => {
  const status = error.status ?? 500;
  res.status(status).json({ message: error.message ?? 'Server error' });
});`,
  },
  {
    id: 'nestjs-1',
    title: 'Controller Get',
    language: 'nestjs',
    difficulty: 'easy',
    themes: ['backend', 'frontend'],
    code: `@Controller('tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  list() {
    return this.service.findAll();
  }
}`,
  },
  {
    id: 'nestjs-2',
    title: 'Guard Check',
    language: 'nestjs',
    difficulty: 'medium',
    themes: ['backend', 'bugfix'],
    code: `@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    return req.headers['x-api-key'] === process.env.API_KEY;
  }
}`,
  },
  {
    id: 'go-1',
    title: 'Map Counter',
    language: 'go',
    difficulty: 'easy',
    themes: ['backend', 'bugfix'],
    code: `counts := map[string]int{}
for _, word := range words {
  counts[word]++
}
fmt.Println(counts)`,
  },
  {
    id: 'go-2',
    title: 'HTTP Handler',
    language: 'go',
    difficulty: 'medium',
    themes: ['backend', 'devops'],
    code: `http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
  _, _ = w.Write([]byte("{\"ok\":true}"))
})`,
  },
  {
    id: 'rust-1',
    title: 'Option Match',
    language: 'rust',
    difficulty: 'easy',
    themes: ['backend', 'bugfix'],
    code: `let user_name = match user {
    Some(u) => u.name,
    None => String::from("guest"),
};
println!("{}", user_name);`,
  },
  {
    id: 'rust-2',
    title: 'Result Propagation',
    language: 'rust',
    difficulty: 'medium',
    themes: ['backend', 'devops'],
    code: `fn load_config(path: &str) -> Result<String, std::io::Error> {
    let raw = std::fs::read_to_string(path)?;
    Ok(raw.trim().to_string())
}`,
  },
  {
    id: 'java-1',
    title: 'Stream Filter',
    language: 'java',
    difficulty: 'easy',
    themes: ['backend', 'bugfix'],
    code: `List<String> active = users.stream()
    .filter(User::isActive)
    .map(User::getEmail)
    .toList();`,
  },
  {
    id: 'java-2',
    title: 'Record DTO',
    language: 'java',
    difficulty: 'medium',
    themes: ['backend', 'frontend'],
    code: `public record SessionDto(String id, long ttl) {}

SessionDto dto = new SessionDto("s_42", 3600L);
System.out.println(dto.id());`,
  },
  {
    id: 'csharp-1',
    title: 'LINQ Projection',
    language: 'csharp',
    difficulty: 'easy',
    themes: ['backend', 'bugfix'],
    code: `var topPlayers = players
    .Where(p => p.Score > 1200)
    .OrderByDescending(p => p.Score)
    .Select(p => p.Name)
    .ToList();`,
  },
  {
    id: 'csharp-2',
    title: 'Minimal API',
    language: 'csharp',
    difficulty: 'medium',
    themes: ['backend', 'devops'],
    code: `app.MapGet("/health", () =>
{
    return Results.Json(new { ok = true, ts = DateTime.UtcNow });
});`,
  },
  {
    id: 'php-1',
    title: 'Array Map',
    language: 'php',
    difficulty: 'easy',
    themes: ['backend', 'bugfix'],
    code: `$emails = array_map(
    fn($user) => strtolower(trim($user['email'])),
    $users
);`,
  },
  {
    id: 'php-2',
    title: 'Laravel Query',
    language: 'php',
    difficulty: 'medium',
    themes: ['backend', 'devops'],
    code: `$posts = Post::query()
    ->where('published', true)
    ->orderByDesc('published_at')
    ->limit(10)
    ->get();`,
  },
  {
    id: 'react-3',
    title: 'Optimistic Like Button',
    language: 'react',
    difficulty: 'medium',
    themes: ['frontend', 'chaos'],
    code: `function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);
  const toggle = async () => {
    setLiked((prev) => !prev);
    await api.toggleLike(postId);
  };
  return <button onClick={toggle}>{liked ? 'Liked' : 'Like'}</button>;
}`,
  },
  {
    id: 'react-4',
    title: 'Transition Search',
    language: 'react',
    difficulty: 'hard',
    themes: ['frontend', 'devops'],
    code: `const [isPending, startTransition] = useTransition();

function onKeywordChange(nextKeyword) {
  startTransition(() => {
    setKeyword(nextKeyword);
    setResults(searchInMemory(nextKeyword));
  });
}`,
  },
  {
    id: 'nextjs-3',
    title: 'Server Action Save',
    language: 'nextjs',
    difficulty: 'medium',
    themes: ['frontend', 'backend'],
    code: `'use server';

export async function saveProfile(formData: FormData) {
  const name = String(formData.get('name') ?? '');
  await db.user.update({ where: { id: 'u_1' }, data: { name } });
  revalidatePath('/settings');
}`,
  },
  {
    id: 'nextjs-4',
    title: 'Metadata Builder',
    language: 'nextjs',
    difficulty: 'hard',
    themes: ['frontend', 'bugfix'],
    code: `export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.summary,
    openGraph: { images: [post.coverUrl] },
  };
}`,
  },
  {
    id: 'vue-3',
    title: 'Composable Loader',
    language: 'vue',
    difficulty: 'medium',
    themes: ['frontend', 'backend'],
    code: `export function useTasks() {
  const tasks = ref([]);
  const loading = ref(false);
  const load = async () => {
    loading.value = true;
    tasks.value = await api.tasks.list();
    loading.value = false;
  };
  return { tasks, loading, load };
}`,
  },
  {
    id: 'vue-4',
    title: 'Emit Update',
    language: 'vue',
    difficulty: 'hard',
    themes: ['frontend', 'bugfix'],
    code: `const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value.trim());
}`,
  },
  {
    id: 'angular-3',
    title: 'Standalone Route',
    language: 'angular',
    difficulty: 'medium',
    themes: ['frontend', 'devops'],
    code: `export const routes: Routes = [
  {
    path: 'projects/:id',
    loadComponent: () => import('./project.page').then((m) => m.ProjectPage),
  },
];`,
  },
  {
    id: 'angular-4',
    title: 'Typed Form Group',
    language: 'angular',
    difficulty: 'hard',
    themes: ['frontend', 'bugfix'],
    code: `profileForm = this.fb.group({
  email: this.fb.nonNullable.control('', [Validators.email]),
  displayName: this.fb.nonNullable.control('', [Validators.required]),
});

submit() {
  if (this.profileForm.valid) this.store.save(this.profileForm.getRawValue());
}`,
  },
  {
    id: 'svelte-3',
    title: 'Load on Mount',
    language: 'svelte',
    difficulty: 'medium',
    themes: ['frontend', 'backend'],
    code: `import { onMount } from 'svelte';

let projects = [];
let loading = true;

onMount(async () => {
  projects = await fetch('/api/projects').then((r) => r.json());
  loading = false;
});`,
  },
  {
    id: 'svelte-4',
    title: 'Writable Preferences',
    language: 'svelte',
    difficulty: 'hard',
    themes: ['frontend', 'bugfix'],
    code: `const preferences = writable({ theme: 'light', tabSize: 2 });

function setTabSize(size) {
  preferences.update((prev) => ({ ...prev, tabSize: size }));
}`,
  },
  {
    id: 'node-3',
    title: 'Stream Pipeline',
    language: 'node',
    difficulty: 'medium',
    themes: ['backend', 'devops'],
    code: `import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';

await pipeline(
  createReadStream('./logs/app.log'),
  createWriteStream('./logs/app-copy.log'),
);`,
  },
  {
    id: 'node-4',
    title: 'Retry With Timeout',
    language: 'node',
    difficulty: 'hard',
    themes: ['backend', 'chaos'],
    code: `async function withTimeout(task, ms = 1800) {
  const timer = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), ms),
  );
  return Promise.race([task(), timer]);
}`,
  },
  {
    id: 'express-3',
    title: 'Auth Middleware',
    language: 'express',
    difficulty: 'medium',
    themes: ['backend', 'bugfix'],
    code: `function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

app.get('/me', requireAuth, handleProfile);`,
  },
  {
    id: 'express-4',
    title: 'Request Logger',
    language: 'express',
    difficulty: 'hard',
    themes: ['backend', 'devops'],
    code: `app.use((req, res, next) => {
  const startedAt = Date.now();
  res.on('finish', () => {
    console.log(req.method, req.path, res.statusCode, Date.now() - startedAt);
  });
  next();
});`,
  },
  {
    id: 'nestjs-3',
    title: 'DTO Validation',
    language: 'nestjs',
    difficulty: 'medium',
    themes: ['backend', 'bugfix'],
    code: `export class CreateTaskDto {
  @IsString()
  @Length(3, 120)
  title: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}`,
  },
  {
    id: 'nestjs-4',
    title: 'Repository Service',
    language: 'nestjs',
    difficulty: 'hard',
    themes: ['backend', 'devops'],
    code: `@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}`,
  },
  {
    id: 'go-3',
    title: 'Context Timeout',
    language: 'go',
    difficulty: 'medium',
    themes: ['backend', 'devops'],
    code: `ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
defer cancel()

req, _ := http.NewRequestWithContext(ctx, http.MethodGet, endpoint, nil)
res, err := client.Do(req)`,
  },
  {
    id: 'go-4',
    title: 'Struct JSON Tags',
    language: 'go',
    difficulty: 'hard',
    themes: ['backend', 'bugfix'],
    code: `type Session struct {
  ID        string    \`json:"id"\`
  TTL       int       \`json:"ttl"\`
  CreatedAt time.Time \`json:"created_at"\`
}

payload, _ := json.Marshal(Session{ID: "s_9", TTL: 3600})`,
  },
  {
    id: 'rust-3',
    title: 'Vector Transform',
    language: 'rust',
    difficulty: 'medium',
    themes: ['backend', 'bugfix'],
    code: `let emails: Vec<String> = users
    .iter()
    .filter(|u| u.active)
    .map(|u| u.email.to_lowercase())
    .collect();`,
  },
  {
    id: 'rust-4',
    title: 'Tokio Spawn Tasks',
    language: 'rust',
    difficulty: 'hard',
    themes: ['backend', 'chaos'],
    code: `let handlers: Vec<_> = jobs
    .into_iter()
    .map(|job| tokio::spawn(async move { process(job).await }))
    .collect();

for handler in handlers {
    handler.await??;
}`,
  },
  {
    id: 'java-3',
    title: 'Optional Mapping',
    language: 'java',
    difficulty: 'medium',
    themes: ['backend', 'bugfix'],
    code: `String city = Optional.ofNullable(user)
    .map(User::address)
    .map(Address::city)
    .orElse("Unknown");

System.out.println(city);`,
  },
  {
    id: 'java-4',
    title: 'HttpClient Request',
    language: 'java',
    difficulty: 'hard',
    themes: ['backend', 'devops'],
    code: `HttpRequest req = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.dev/health"))
    .timeout(Duration.ofSeconds(2))
    .GET()
    .build();

HttpResponse<String> res = client.send(req, HttpResponse.BodyHandlers.ofString());`,
  },
  {
    id: 'csharp-3',
    title: 'Pattern Matching',
    language: 'csharp',
    difficulty: 'medium',
    themes: ['backend', 'bugfix'],
    code: `string label = response switch
{
    { StatusCode: >= 500 } => "ServerError",
    { StatusCode: >= 400 } => "ClientError",
    _ => "Ok",
};`,
  },
  {
    id: 'csharp-4',
    title: 'EF Core Query',
    language: 'csharp',
    difficulty: 'hard',
    themes: ['backend', 'devops'],
    code: `var recent = await db.Sessions
    .Where(s => s.ExpiresAt > DateTime.UtcNow)
    .OrderByDescending(s => s.CreatedAt)
    .Take(20)
    .ToListAsync();`,
  },
  {
    id: 'php-3',
    title: 'Request Validation',
    language: 'php',
    difficulty: 'medium',
    themes: ['backend', 'bugfix'],
    code: `$validated = $request->validate([
    'email' => ['required', 'email'],
    'password' => ['required', 'min:8'],
]);

Auth::attempt($validated);`,
  },
  {
    id: 'php-4',
    title: 'Collection Pipeline',
    language: 'php',
    difficulty: 'hard',
    themes: ['backend', 'devops'],
    code: `$summary = collect($orders)
    ->groupBy('currency')
    ->map(fn($items) => $items->sum('total'))
    ->sortDesc()
    ->toArray();`,
  },
];

export const LANGUAGE_LABELS: Record<LanguageMode, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  sql: 'SQL',
  json: 'JSON',
  terminal: 'Terminal',
  react: 'React',
  nextjs: 'Next.js',
  vue: 'Vue',
  angular: 'Angular',
  svelte: 'Svelte',
  node: 'Node.js',
  express: 'Express',
  nestjs: 'NestJS',
  go: 'Go',
  rust: 'Rust',
  java: 'Java',
  csharp: 'C#',
  php: 'PHP',
};

export function getSnippetPool(language: LanguageMode): Snippet[] {
  return SNIPPETS.filter((snippet) => snippet.language === language);
}

export function estimateSessionTime(language: LanguageMode, challengeTarget: number): number {
  const pool = getSnippetPool(language);
  if (pool.length === 0 || challengeTarget <= 0) {
    return 30;
  }

  const lengths = pool
    .map((snippet) => snippet.code.length)
    .sort((a, b) => a - b);

  const focusSliceStart = Math.floor(lengths.length * 0.35);
  const focused = lengths.slice(focusSliceStart);
  const avgLength =
    focused.reduce((sum, length) => sum + length, 0) / Math.max(1, focused.length);

  // Calibrated for code typing: slower than plain words + setup buffer each challenge.
  const perChallengeSeconds = Math.max(20, Math.round(avgLength / 4.2) + 8);
  const total = perChallengeSeconds * challengeTarget;

  return Math.min(420, Math.max(75, total));
}
