const HOST = '192.168.1.74'; // Remplacez par votre IP privée
const PORT = 3000; // Port par défaut de JSON Server (ne pas changer ou alors... adapter avec le script dans package.json)

export const BACKEND_URL = `http://${HOST}:${PORT}`;
export const BACKEND_ROUTE_NOTES = `${BACKEND_URL}/notes`;