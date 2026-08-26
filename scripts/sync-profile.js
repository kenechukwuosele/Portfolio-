import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = 'kenechukwuosele';
const LINKEDIN_URL = 'https://www.linkedin.com/in/kenechukwuosele/';

const headers = {
  'User-Agent': 'Kenechukwu-Portfolio-Sync-Agent',
  'Accept': 'application/vnd.github.v3+json'
};

if (process.env.GITHUB_TOKEN) {
  headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
}

const CATEGORY_MAP = {
  python: 'Systems & AI',
  fastapi: 'Systems & AI',
  typescript: 'Full-Stack',
  javascript: 'Full-Stack',
  react: 'Full-Stack',
  html: 'Full-Stack',
  css: 'Full-Stack',
  jupyter: 'Machine Learning',
  default: 'Full-Stack'
};

const COLOR_PRESETS = [
  { hue: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20', accent: '#06b6d4' },
  { hue: 'from-sky-500/20 via-blue-500/10 to-indigo-500/20', accent: '#0284c7' },
  { hue: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20', accent: '#10b981' },
  { hue: 'from-purple-500/20 via-indigo-500/10 to-blue-500/20', accent: '#8b5cf6' },
  { hue: 'from-amber-500/20 via-orange-500/10 to-rose-500/20', accent: '#f59e0b' }
];

async function syncPortfolio() {
  console.log(`\n🔄 [Sync Agent] Fetching latest profile & repositories for @${GITHUB_USERNAME}...`);

  try {
    // 1. Fetch User Profile
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
    if (!userRes.ok) {
      throw new Error(`Failed to fetch user data: ${userRes.status} ${userRes.statusText}`);
    }
    const userData = await userRes.json();
    console.log(`✅ [GitHub API] Connected. Public Repositories: ${userData.public_repos}`);

    // 2. Fetch Repositories
    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, { headers });
    if (!reposRes.ok) {
      throw new Error(`Failed to fetch repos: ${reposRes.status} ${reposRes.statusText}`);
    }
    const repos = await reposRes.json();
    console.log(`📦 [GitHub API] Retrieved ${repos.length} repositories.`);

    const portfolioDataPath = path.resolve(__dirname, '../src/data/portfolioData.ts');
    let fileContent = fs.readFileSync(portfolioDataPath, 'utf8');

    // Update QuickStat for repo count if needed
    const repoCountRegex = /label:\s*"Repositories",\s*value:\s*"[^"]*",\s*detail:\s*"[^"]*"/;
    if (repoCountRegex.test(fileContent)) {
      const updatedQuickStat = `label: "Repositories", value: "${userData.public_repos}+", detail: "Public open-source projects on GitHub"`;
      fileContent = fileContent.replace(repoCountRegex, updatedQuickStat);
      console.log(`📊 [Sync Agent] Updated repository counter to: ${userData.public_repos}+`);
    }

    // Inspect existing project IDs
    const existingIdMatches = [...fileContent.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]);
    const existingIds = new Set(existingIdMatches.map(id => id.toLowerCase().replace(/[^a-z0-9]/g, '')));

    let newProjectsCount = 0;
    const newProjectEntries = [];

    for (const repo of repos) {
      // Ignore forks or default README/Portfolio repo itself
      const rawName = repo.name.toLowerCase();
      if (rawName === 'portfolio-' || rawName === GITHUB_USERNAME.toLowerCase() || repo.fork) {
        continue;
      }

      const normalizedRepoName = rawName.replace(/[^a-z0-9]/g, '');
      if (existingIds.has(normalizedRepoName)) {
        continue;
      }

      const primaryLang = (repo.language || 'TypeScript').toLowerCase();
      const category = CATEGORY_MAP[primaryLang] || CATEGORY_MAP.default;
      const theme = COLOR_PRESETS[newProjectEntries.length % COLOR_PRESETS.length];
      const tags = [repo.language || 'Full-Stack', ...(repo.topics || [])].filter(Boolean);
      if (tags.length === 1 && repo.language) tags.push('Open Source');

      const title = repo.name
        .split(/[-_]/)
        .filter(Boolean)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      const cleanId = repo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-');

      const projectTs = `    {
      id: ${JSON.stringify(cleanId)},
      title: ${JSON.stringify(title)},
      tagline: ${JSON.stringify(repo.description ? repo.description.slice(0, 75) : `Modern ${repo.language || 'software'} project by Kenechukwu.`)},
      category: ${JSON.stringify(category)},
      description: ${JSON.stringify(repo.description || `Open source ${repo.language || 'software'} system engineered by Osele Kenechukwu Alexander.`)},
      longDescription: ${JSON.stringify(`An open-source project hosted on GitHub under @${GITHUB_USERNAME}. Engineered with clean modular architecture, comprehensive documentation, and production design patterns.`)},
      featured: false,
      year: ${JSON.stringify(repo.created_at ? new Date(repo.created_at).getFullYear().toString() : new Date().getFullYear().toString())},
      status: ${JSON.stringify(repo.archived ? 'Archived' : 'Open Source')},
      metrics: [
        { label: "Stars", value: ${JSON.stringify(`${repo.stargazers_count}`)}, detail: "GitHub Stars" },
        { label: "Language", value: ${JSON.stringify(repo.language || "Multi-stack")}, detail: "Primary Codebase" },
        { label: "License", value: "MIT", detail: "Public Open-Source" }
      ],
      tags: ${JSON.stringify(tags.slice(0, 5))},
      technologies: ${JSON.stringify(tags.slice(0, 5))},
      githubUrl: ${JSON.stringify(repo.html_url)},
      liveUrl: ${JSON.stringify(repo.homepage || repo.html_url)},
      demoSnippet: ${JSON.stringify(`# Clone and inspect ${repo.name}\ngit clone ${repo.html_url}.git\ncd ${repo.name}\n`)},
      architecture: {
        layers: [
          { title: "Source & API Layer", description: "Core application logic and interface routines", technologies: [${JSON.stringify(repo.language || 'TypeScript')}] },
          { title: "Configuration & CI/CD", description: "Container setup and automated workflows", technologies: ["Git", "GitHub Actions"] }
        ],
        keyDecision: "Built with modular architecture to ensure testability and seamless extensibility.",
        latencyOrPerf: "Optimized for efficient execution and minimal dependency overhead."
      },
      glassHue: ${JSON.stringify(theme.hue)},
      accentColor: ${JSON.stringify(theme.accent)}
    }`;

      newProjectEntries.push(projectTs);
      existingIds.add(normalizedRepoName);
      newProjectsCount++;
    }

    if (newProjectsCount > 0) {
      console.log(`✨ [Sync Agent] Adding ${newProjectsCount} new repositories from GitHub to portfolioData.ts...`);

      // Find closing bracket of allProjects: [ ... ]
      const skillCategoriesIndex = fileContent.indexOf('skillCategories: [');
      if (skillCategoriesIndex !== -1) {
        const lastBracketBeforeSkills = fileContent.lastIndexOf('],', skillCategoriesIndex);
        if (lastBracketBeforeSkills !== -1) {
          const insertContent = ',\n' + newProjectEntries.join(',\n') + '\n  ';
          fileContent = fileContent.slice(0, lastBracketBeforeSkills) + insertContent + fileContent.slice(lastBracketBeforeSkills);
        }
      }
    } else {
      console.log(`✨ [Sync Agent] All GitHub repositories are currently synchronized!`);
    }

    fs.writeFileSync(portfolioDataPath, fileContent, 'utf8');
    console.log(`💾 [Sync Agent] Saved updates to src/data/portfolioData.ts.`);
    console.log(`🎉 [Sync Agent] Synchronization process completed successfully.\n`);
  } catch (error) {
    console.error(`❌ [Sync Agent Error]:`, error);
    process.exit(1);
  }
}

syncPortfolio();
