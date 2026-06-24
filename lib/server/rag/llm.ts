const COMPLIANCE =
  "効能効果の断定表現は避け、施術設計・ケア提案の観点で回答してください。";

export async function callLlm(
  query: string,
  context: string,
  userMode: "hairdresser" | "dealer",
): Promise<string | null> {
  const openaiKey = process.env.OPENAI_API_KEY;
  const xaiKey = process.env.XAI_API_KEY;

  const systemPrompt = `あなたはEW-R Hair Science AcademyのAI教育アシスタントです。
${userMode === "dealer" ? "ディーラー（営業担当）" : "美容師"}向けに回答してください。
${COMPLIANCE}
以下の教材コンテキストのみを根拠に回答し、コンテキストにない内容は推測しないでください。`;

  const userPrompt = `【教材コンテキスト】\n${context}\n\n【質問】\n${query}`;

  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.3,
          max_tokens: 800,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content ?? null;
      }
    } catch {
      /* fallback */
    }
  }

  if (xaiKey) {
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${xaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.XAI_MODEL ?? "grok-2-latest",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.3,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content ?? null;
      }
    } catch {
      /* fallback */
    }
  }

  return null;
}