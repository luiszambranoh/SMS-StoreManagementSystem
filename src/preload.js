const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'api', {
    // Function to fetch data from the database
    executeQuery: async (query, params = []) => {
      return new Promise((resolve, reject) => {
        ipcRenderer.invoke('execute-query', query, params)
          .then(results => {
            console.log(`Query executed successfully: ${query}`);
            resolve(results);
          })
          .catch(error => {
            console.error(`ExecuteQuery ERROR: ${error} - Query: ${query}`);
            reject(error);
          });
      });
    },

    // Function to execute SQL commands like INSERT, UPDATE, DELETE
    executeUpdate: async (query, params = []) => {
      return new Promise((resolve, reject) => {
        ipcRenderer.invoke('execute-sql', query, params)
          .then(result => {
            console.log(`SQL command executed successfully: ${query}`);
            resolve(result);
          })
          .catch(error => {
            console.error(`ExecuteSQL ERROR: ${error} - SQL Command: ${query}`);
            reject(error);
          });
      });
    }
  }
);
