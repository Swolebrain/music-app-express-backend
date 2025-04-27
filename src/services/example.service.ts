/**
 * Example service with business logic
 */

// Mock data - would normally come from a database
const mockItems = [
  { id: '1', name: 'Item 1', description: 'Description for item 1' },
  { id: '2', name: 'Item 2', description: 'Description for item 2' },
  { id: '3', name: 'Item 3', description: 'Description for item 3' },
];

/**
 * Find all items
 */
export const findAll = async () => {
  // In a real application, this would query a database
  return mockItems;
};

/**
 * Find item by ID
 */
export const findById = async (id: string) => {
  // In a real application, this would query a database
  return mockItems.find(item => item.id === id);
}; 