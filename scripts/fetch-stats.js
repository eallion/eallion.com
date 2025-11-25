// fetch-stats.js
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const STATS_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'stats', 'stats.json');

// API Endpoints & Config
const MASTODON_API_URL = 'https://e5n.cc/api/v1/accounts/111136231674527355/statuses?limit=1&exclude_replies=true&exclude_reblogs=false';
const STEAM_WEB_API_KEY = process.env.STEAM_WEB_API_KEY;
const STEAM_API_URL = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_WEB_API_KEY}&steamid=76561197989210276&include_appinfo=true&include_played_free_games=true&format=json`;
const NEODB_API_URL = 'https://neodb.social/api/me/shelf/complete?page=1';
const PENTA_API_URL = `${process.env.DIRECTUS_API_URL}items/Penta?aggregate[count]=*`;

// Default Values
const DEFAULTS = {
    mastodon_follower: '-1',
    mastodon_following: '332',
    mastodon_statuses: '3383',
    steam_game_owner_count: '149',
    neodb_marked: '390',
    lol_penta: '111',
    github_commits: '2304',
    github_last_commit: '2025-11-25T10:59:54+08:00',
    github_hash_long: '69d6ffe319557706dcf4150e960e7b7e21a37d9f',
    github_hash_short: '69d6ffe',
    github_repo_size: '71532'
};

// Environment Variables
const NEODB_ACCESS_TOKEN = process.env.NEODB_ACCESS_TOKEN;
const DIRECTUS_ACCESS_TOKEN = process.env.DIRECTUS_ACCESS_TOKEN;

/**
 * Fetch Mastodon Stats
 */
async function fetchMastodonStats() {
    try {
        const response = await fetch(MASTODON_API_URL);
        if (!response.ok) throw new Error(`Mastodon API failed: ${response.status}`);
        const data = await response.json();
        if (data && data.length > 0 && data[0].account) {
            return {
                followers: data[0].account.followers_count,
                following: data[0].account.following_count,
                statuses: data[0].account.statuses_count
            };
        }
    } catch (error) {
        console.error('Error fetching Mastodon stats:', error.message);
    }
    return null;
}

/**
 * Fetch Steam Stats
 */
async function fetchSteamStats() {
    try {
        const response = await fetch(STEAM_API_URL);
        if (!response.ok) throw new Error(`Steam API failed: ${response.status}`);
        const data = await response.json();
        if (data && data.response && data.response.game_count) {
            return data.response.game_count;
        }
    } catch (error) {
        console.error('Error fetching Steam stats:', error.message);
    }
    return null;
}

/**
 * Fetch NeoDB Stats
 */
async function fetchNeoDBStats() {
    try {
        const response = await fetch(NEODB_API_URL, {
            headers: {
                'Authorization': `Bearer ${NEODB_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`NeoDB API failed: ${response.status}`);
        const data = await response.json();
        if (data && data.count !== undefined) {
            return data.count;
        }
    } catch (error) {
        console.error('Error fetching NeoDB stats:', error.message);
    }
    return null;
}

/**
 * Fetch LoL Penta Stats
 */
async function fetchPentaStats() {
    try {
        const response = await fetch(PENTA_API_URL, {
            headers: {
                'Authorization': `Bearer ${DIRECTUS_ACCESS_TOKEN}`
            }
        });
        if (!response.ok) throw new Error(`Penta API failed: ${response.status}`);
        const data = await response.json();
        if (data && data.data && data.data.length > 0 && data.data[0].count) {
            return data.data[0].count;
        }
    } catch (error) {
        console.error('Error fetching Penta stats:', error.message);
    }
    return null;
}

/**
 * Fetch Git Stats
 */
function fetchGitStats() {
    try {
        const commits = execSync('git rev-list --count HEAD').toString().trim();
        const lastCommit = execSync('git log -1 --format=%aI').toString().trim();
        const hashLong = execSync('git rev-parse HEAD').toString().trim();
        const hashShort = execSync('git rev-parse --short=7 HEAD').toString().trim();
        // Calculate repo size in KB (.git)
        // Using du -sk with excludes
        const size = execSync('du -sk .git | cut -f1').toString().trim();

        return {
            commits,
            lastCommit,
            hashLong,
            hashShort,
            size
        };
    } catch (error) {
        console.error('Error fetching Git stats:', error.message);
    }
    return null;
}

/**
 * Main Function
 */
async function main() {
    console.log('Starting stats fetch...');

    const [mastodon, steam, neodb, penta] = await Promise.all([
        fetchMastodonStats(),
        fetchSteamStats(),
        fetchNeoDBStats(),
        fetchPentaStats()
    ]);

    const gitStats = fetchGitStats();

    const stats = {
        "mastodon_follower": mastodon ? String(mastodon.followers) : DEFAULTS.mastodon_follower,
        "mastodon_following": mastodon ? String(mastodon.following) : DEFAULTS.mastodon_following,
        "mastodon_statuses": mastodon ? String(mastodon.statuses) : DEFAULTS.mastodon_statuses,
        "steam_game_owner_count": steam ? String(steam) : DEFAULTS.steam_game_owner_count,
        "neodb_marked": neodb ? String(neodb) : DEFAULTS.neodb_marked,
        "lol_penta": penta ? String(penta) : DEFAULTS.lol_penta,
        "github_commits": gitStats ? String(gitStats.commits) : DEFAULTS.github_commits,
        "github_last_commit": gitStats ? String(gitStats.lastCommit) : DEFAULTS.github_last_commit,
        "github_hash_long": gitStats ? String(gitStats.hashLong) : DEFAULTS.github_hash_long,
        "github_hash_short": gitStats ? String(gitStats.hashShort) : DEFAULTS.github_hash_short,
        "github_repo_size": gitStats ? String(gitStats.size) : DEFAULTS.github_repo_size
    };

    // Ensure directory exists
    const dir = path.dirname(STATS_JSON_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(STATS_JSON_PATH, JSON.stringify(stats, null, 2));
    console.log('Stats saved to:', STATS_JSON_PATH);
    console.log(stats);
}

main();
