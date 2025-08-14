// API to handle database operations, more explicitly named and parameterized

async function fetchQuery(sql, params = []) {
  try {
    const results = await window.api.executeQuery(sql, params);
    console.log('Fetch Results:', results);
    return results;
  } catch (error) {
    console.error('FetchQuery ERROR:', error);
    throw error; // It's often better to rethrow errors after logging so that the caller can handle them
  }
}

async function executeUpdate(sql, params = []) {
  try {
    // Use sqlQuery instead of executeUpdate since that's what your preload exposes for SQL commands
    const result = await window.api.executeUpdate(sql, params); // This handles INSERT, UPDATE, DELETE
    console.log('Update Execution Result:', result);
    return result;
  } catch (error) {
    console.error('ExecuteUpdate ERROR:', error);
    throw error;
  }
}

export { fetchQuery, executeUpdate };
