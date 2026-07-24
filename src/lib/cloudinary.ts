import { v2 as cloudinary } from "cloudinary";

const url = process.env.CLOUDINARY_URL || "";
const match = url.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/);
const cloudName = match?.[3] || "dc3nz9utk";
const apiKey = match?.[1] || "479697594646158";
const apiSecret = match?.[2] || "Q4iWIksOxLAtK1A6EoYJPG4IR3g";

cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

export { cloudinary };
export const CLOUDINARY_CLOUD_NAME = cloudName;
