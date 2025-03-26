const API_BASE = "http://localhost:3000";

export async function getChapters() {
  try {
    console.log("Fetching chapters...");
    const response = await fetch(`${API_BASE}/chapters`);
    if (!response.ok) throw new Error("Failed to fetch chapters");
    const data = await response.json();
    console.log("Chapters fetched:", data);
    return data;
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}

export async function getUsers() {
  try {
    console.log("Fetching chapters...");
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    console.log("users fetched:", data);
    return data;
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}

export async function getUsersChapters() {
  try {
    console.log("Fetching chapters...");
    const response = await fetch(`${API_BASE}/usersChapters`);
    if (!response.ok) throw new Error("Failed to fetch usersChapters");
    const data = await response.json();
    console.log("usersChapters fetched:", data);
    return data;
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}