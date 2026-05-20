import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME ?? "vertacore-assets";
const PUBLIC_URL = process.env.R2_PUBLIC_URL ?? "https://assets.vertacore.com";

export function getPublicUrl(key: string): string {
  return `${PUBLIC_URL}/${key}`;
}

export async function uploadFile(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<string> {
  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000",
    }),
  );
  return getPublicUrl(key);
}

export async function deleteFile(key: string): Promise<void> {
  await r2.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

export async function listFiles(prefix: string) {
  const result = await r2.send(
    new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix }),
  );
  return result.Contents ?? [];
}

export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 3600,
): Promise<string> {
  return getSignedUrl(
    r2,
    new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: contentType }),
    { expiresIn },
  );
}

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const ALLOWED_FILE_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  "application/pdf",
] as const;

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_PDF_SIZE = 25 * 1024 * 1024;   // 25MB
