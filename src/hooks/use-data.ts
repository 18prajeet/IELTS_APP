import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// User Hook
export function useUser() {
  return useQuery({
    queryKey: [api.user.get.path],
    queryFn: async () => {
      const res = await fetch(api.user.get.path);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch user");
      return api.user.get.responses[200].parse(await res.json());
    },
  });
}

// Activities Hook
export function useActivities() {
  return useQuery({
    queryKey: [api.activities.list.path],
    queryFn: async () => {
      const res = await fetch(api.activities.list.path);
      if (!res.ok) throw new Error("Failed to fetch activities");
      return api.activities.list.responses[200].parse(await res.json());
    },
  });
}

// Daily Challenges Hook
export function useDailyChallenges() {
  return useQuery({
    queryKey: [api.challenges.daily.path],
    queryFn: async () => {
      const res = await fetch(api.challenges.daily.path);
      if (!res.ok) throw new Error("Failed to fetch daily challenges");
      return api.challenges.daily.responses[200].parse(await res.json());
    },
  });
}

// Complete Challenge Mutation
export function useCompleteChallenge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.challenges.complete.path, { id });
      const res = await fetch(url, {
        method: api.challenges.complete.method,
      });
      if (!res.ok) throw new Error("Failed to complete challenge");
      return api.challenges.complete.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.challenges.daily.path] });
      queryClient.invalidateQueries({ queryKey: [api.user.get.path] }); // Score/Momentum update
    },
  });
}

// Badges Hook
export function useBadges() {
  return useQuery({
    queryKey: [api.badges.list.path],
    queryFn: async () => {
      const res = await fetch(api.badges.list.path);
      if (!res.ok) throw new Error("Failed to fetch badges");
      return api.badges.list.responses[200].parse(await res.json());
    },
  });
}

// Leaderboard Hook
export function useLeaderboard() {
  return useQuery({
    queryKey: [api.leaderboard.list.path],
    queryFn: async () => {
      const res = await fetch(api.leaderboard.list.path);
      if (!res.ok) throw new Error("Failed to fetch leaderboard");
      return api.leaderboard.list.responses[200].parse(await res.json());
    },
  });
}

// Upload Test Hook
export function useUploadTest() {
  return useMutation({
    mutationFn: async (file: File) => {
      // In a real app, we'd use FormData. Here we mock it as per the mock endpoint
      // const formData = new FormData();
      // formData.append("file", file);
      
      const res = await fetch(api.upload.test.path, {
        method: api.upload.test.method,
        // body: formData, // Simplified for mock
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!res.ok) throw new Error("Analysis failed");
      return api.upload.test.responses[200].parse(await res.json());
    },
  });
}
