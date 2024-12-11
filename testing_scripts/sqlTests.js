
// tests/sqlTests.js

const { exec } = require('child_process');
const assert = require('assert');

// Test SQL Scripts
const testSQLScript = (scriptPath, expectedOutput, callback) => {
  exec(`sqlite3 test_database.db < ${scriptPath}`, (error, stdout, stderr) => {
    if (error || stderr) {
      callback(new Error(`Error running script: ${scriptPath}\n${stderr}`));
    } else {
      try {
        assert.strictEqual(stdout.trim(), expectedOutput.trim(), `Unexpected output for script: ${scriptPath}`);
        callback(null);
      } catch (err) {
        callback(err);
      }
    }
  });
};

// Example SQL Tests
console.log('Running SQL script tests...');

testSQLScript('../testing_sql/create_room_application_table.sql', '', (err) => {
  if (err) {
    console.error(`Test failed: ${err.message}`);
  } else {
    console.log('create_room_application_table.sql passed!');
  }
});

// Add more SQL tests as needed...

console.log('SQL script tests completed.');
