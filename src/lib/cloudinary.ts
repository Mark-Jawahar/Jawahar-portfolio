const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`;

export function getCloudinaryUrl(publicId: string, options?: Record<string, string>) {
  if (!CLOUD_NAME) return publicId;
  const base = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  const transforms = options
    ? Object.entries(options)
        .map(([k, v]) => `${k}_${v}`)
        .join(",")
    : "";
  return transforms ? `${base}/${transforms}/${publicId}` : `${base}/${publicId}`;
}

export function optimizeImage(publicId: string, width = 800, height?: number) {
  const opts: Record<string, string> = {
    f: "auto",
    q: "auto",
    w: String(width),
  };
  if (height) opts.h = String(height);
  return getCloudinaryUrl(publicId, opts);
}

export async function uploadImage(file: File) {
  if (!CLOUD_NAME) throw new Error("Cloudinary not configured");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "portfolio");
  const res = await fetch(`${CLOUDINARY_URL}/upload`, { method: "POST", body: formData });
  return res.json();
}

export async function deleteImage(publicId: string) {
  if (!API_KEY || !API_SECRET) throw new Error("Cloudinary not configured");
  const timestamp = Math.round(Date.now() / 1000);
  const signature = await generateSignature(publicId, timestamp);
  const res = await fetch(`${CLOUDINARY_URL}/destroy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_id: publicId, signature, timestamp, api_key: API_KEY }),
  });
  return res.json();
}

async function generateSignature(publicId: string, timestamp: number) {
  const msg = `public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
  const buf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(msg));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
