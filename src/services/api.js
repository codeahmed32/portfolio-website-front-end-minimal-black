const API_BASE_URL = "http://localhost:5000/api";

export const fetchProjects = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
};

export const sendInquiry = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
};