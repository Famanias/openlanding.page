export const HTML_MAX_BYTES = 5_242_880;
export const SCREENSHOT_MAX_BYTES = 2_097_152;
export const REQUEST_MAX_BYTES = 8_388_608;
export const COMMUNITY_PAGE_SIZE = 24;
export const TITLE_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 500;
export const CREATOR_NAME_MAX_LENGTH = 80;
export const URL_MAX_LENGTH = 2048;
export const EMAIL_MAX_LENGTH = 254;
export const QUERY_MAX_LENGTH = 160;
export const LISTING_CONSENT = { version: "listing-2026-11-07", text: "I created this work or have permission to submit it, and allow OpenLandingPage to display this listing, creator credit, and submitted screenshot." } as const;
export const HTML_CONSENT = { version: "html-mit-2026-11-07", text: "I have the rights to distribute this HTML and its included assets. I contribute the uploaded template under the MIT License, allowing personal and commercial use, modification, and redistribution with the required copyright and license notices. This grant applies to the upload, not the linked website." } as const;
export type AssetKind = "html" | "screenshot";
export type SubmissionStatus = "receiving" | "pending" | "approved" | "rejected" | "unpublished";
export interface CommunityItem { id: string; title: string; description: string; websiteUrl: string; creatorName: string; creditUrl: string; approvedAt: string; imageUrl: string | null; downloadUrl: string | null }
export interface CommunityQuery { query: string; downloadsOnly: boolean; cursor?: string }
export interface CommunityPage { items: CommunityItem[]; nextCursor: string | null }
export interface SubmissionReceipt { receiptId: string; status: "pending" }
export interface CommunityError { error: { code: string; message: string; fields?: Record<string, string> }; retryAfter?: number }
