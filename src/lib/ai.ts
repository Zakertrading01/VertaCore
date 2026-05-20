import "server-only";
import crypto from "crypto";

// AES-256-CBC encryption for API keys stored in DB

function getEncryptionKey(): Buffer {
  const rawKey = process.env.AI_ENCRYPTION_KEY ?? "fallback-dev-key-not-for-production";
  return crypto.createHash("sha256").update(rawKey).digest();
}

export function encryptApiKey(plaintext: string): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decryptApiKey(ciphertext: string): string {
  if (!ciphertext || !ciphertext.includes(":")) return "";
  const key = getEncryptionKey();
  const [ivHex, encHex] = ciphertext.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const enc = Buffer.from(encHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
}

export function maskApiKey(plaintext: string): string {
  if (!plaintext || plaintext.length < 8) return "••••••••";
  return `${plaintext.slice(0, 4)}${"•".repeat(Math.max(0, plaintext.length - 8))}${plaintext.slice(-4)}`;
}

export function hashIp(ip: string): string {
  const salt = process.env.AI_IP_SALT ?? "vertacore-ip-salt";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface RunChatResult {
  reply: string;
  provider: string;
  model: string;
}

export async function runChat(
  messages: ChatMessage[],
  systemPrompt: string,
  provider: string,
  model: string,
  apiKey: string,
): Promise<RunChatResult> {
  if (provider === "anthropic") {
    return runAnthropicChat(messages, systemPrompt, model, apiKey);
  }
  if (provider === "openai") {
    return runOpenAIChat(messages, systemPrompt, model, apiKey);
  }
  throw new Error(`Unknown provider: ${provider}`);
}

async function runAnthropicChat(
  messages: ChatMessage[],
  systemPrompt: string,
  model: string,
  apiKey: string,
): Promise<RunChatResult> {
  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model,
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  const reply =
    response.content[0]?.type === "text" ? response.content[0].text : "";

  return { reply, provider: "anthropic", model };
}

async function runOpenAIChat(
  messages: ChatMessage[],
  systemPrompt: string,
  model: string,
  apiKey: string,
): Promise<RunChatResult> {
  const OpenAI = (await import("openai")).default;
  const client = new OpenAI({ apiKey });

  const response = await client.chat.completions.create({
    model,
    max_tokens: 1024,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
  });

  const reply = response.choices[0]?.message?.content ?? "";

  return { reply, provider: "openai", model };
}
