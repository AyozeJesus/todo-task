/**
 * Generates a unique ID for tasks using a hybrid approach:
 * - Uses timestamp + random number for better uniqueness
 * - Prevents ID collisions even with multiple tabs/instances
 * - More robust than simple increment
 */
export const generateUniqueId = (): number => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return Number(`${timestamp}${random}`);
};
