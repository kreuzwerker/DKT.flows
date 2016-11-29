const fs = require('fs');
const path = require('path');

const dbFile = path.join(__dirname, 'db.json');
const fixtures = {
  flows: require('./fixtures/flows.json'),
  services: require('./fixtures/services.json')
};

// Reset the database with fixtures
fs.writeFileSync(dbFile, JSON.stringify(fixtures), {encoding: 'utf-8'});
// fs.exists(dbFile, exists => {
//   if (!exists) {
//     fs.writeFileSync(dbFile, JSON.stringify(dbContent), {encoding: 'utf-8'});
//   }
// });
