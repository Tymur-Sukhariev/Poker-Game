// src/functions/gameGet.ts

export async function gameGet() {
  try {
    const response = await fetch("http://localhost:8000/hands/history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Should be an array of hand records
  } catch (error) {
    console.error("Failed to fetch game history:", error);
    return [];
  }
}
