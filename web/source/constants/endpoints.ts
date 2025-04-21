import { API_URL, FRONT_URL, MERCURE_URL } from './app';

/**
 * --- ENDPOINTS ---
 */
export const PLAYER_ENDPOINT = `${API_URL}/player`;
export const SESSION_ENDPOINT = `${API_URL}/player/me`;
export const ROOM_ENDPOINT = `${API_URL}/room`;
export const MISSION_ENDPOINT = `${API_URL}/mission`;

/**
 * --- TOPICS (SSE)  ---
 */
export const ROOM_TOPIC = `${MERCURE_URL}?topic=room`;

/**
 * --- ROUTES ---
 */
export const JOIN_ROOM_ROUTE = `${FRONT_URL}/join`;
