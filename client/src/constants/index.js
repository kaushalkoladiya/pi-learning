export const APP_NAME = 'Pi Learning';

export const getToken = () => "Bearer " + localStorage.getItem("token");

export const AZURE_BASE_URL = process.env.NEXT_AZURE_BASE_URL || "https://pilearningcapstone.blob.core.windows.net/pi-learning/";