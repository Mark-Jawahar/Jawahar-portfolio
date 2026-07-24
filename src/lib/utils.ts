import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateOrderId(): string {
  const prefix = "HBP";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function getDeliveryDate(estimate: string): string {
  const days = parseInt(estimate.split("-")[0]) || 5;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getUPILink(amount: number): string {
  return `upi://pay?pa=9620151434@upi&pn=HookedByPree&am=${amount}&cu=INR`;
}

export type Theme = "light" | "dark";
