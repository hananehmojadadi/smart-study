export async function fetchAISummary(apiKey, text) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI summarizer." },
        {
          role: "user",
          content: `Summarize this text in 3 bullet points:\n\n${text}`,
        },
      ],
    }),
  });
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "No summary found.";
}

export async function fetchAIQuiz(apiKey, text) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a quiz generator AI." },
        {
          role: "user",
          content: `Create 3 quiz questions (with answers) based on this:\n\n${text}`,
        },
      ],
    }),
  });
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "No quiz found.";
}
