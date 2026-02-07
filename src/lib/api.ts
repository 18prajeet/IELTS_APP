export const api = {
  user: {
    get: { path: "/api/user" }
  },
  activities: {
    list: { path: "/api/activities" }
  },
  challenges: {
    daily: { path: "/api/challenges/daily" },
    complete: { path: "/api/challenges/complete/:id", method: "POST" }
  },
  badges: {
    list: { path: "/api/badges" }
  },
  leaderboard: {
    list: { path: "/api/leaderboard" }
  },
  upload: {
    test: { path: "/api/upload-test", method: "POST" }
  }
};

export function buildUrl(path: string, params: Record<string, any>) {
  let url = path;
  for (const key in params) {
    url = url.replace(`:${key}`, params[key]);
  }
  return url;
}
