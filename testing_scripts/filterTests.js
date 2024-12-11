
const assert = require('assert');
const { filterProperties } = require('../my-express-app/script'); // Adjust path based on file structure

// Mock data 
const mockProperties = [
  { location: 'City A', price: 500, bedrooms: 3, bathrooms: 2, sshFeatures: ['Camera'] },
  { location: 'City B', price: 750, bedrooms: 2, bathrooms: 1, sshFeatures: ['Lock'] },
  { location: 'City A', price: 600, bedrooms: 1, bathrooms: 1, sshFeatures: ['Camera', 'Sensor'] },
];

console.log('Running tests for filterProperties...');

assert.deepStrictEqual(
  filterProperties(mockProperties, { location: 'City A' }),
  [
    { location: 'City A', price: 500, bedrooms: 3, bathrooms: 2, sshFeatures: ['Camera'] },
    { location: 'City A', price: 600, bedrooms: 1, bathrooms: 1, sshFeatures: ['Camera', 'Sensor'] },
  ],
  'Failed to filter by location'
);
assert.deepStrictEqual(
  filterProperties(mockProperties, { minPrice: 500, maxPrice: 600 }),
  [
    { location: 'City A', price: 500, bedrooms: 3, bathrooms: 2, sshFeatures: ['Camera'] },
    { location: 'City A', price: 600, bedrooms: 1, bathrooms: 1, sshFeatures: ['Camera', 'Sensor'] },
  ],
  'Failed to filter by price range'
);

console.log('All filter tests passed!');
