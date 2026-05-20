export interface RFQRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  jobTitle?: string;
  country?: string;
  industry?: string;
  items: string;
  message?: string;
  source?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NewsletterRequest {
  email: string;
}

export interface CataloguePDFRequest {
  email: string;
  company?: string;
}

export interface ApiResponse<T = null> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
}

export interface WidgetConfig {
  enabled: boolean;
  questions: Array<{
    id: string;
    text: string;
    answer?: string | null;
  }>;
}
