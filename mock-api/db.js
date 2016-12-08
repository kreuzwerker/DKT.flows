const fs = require('fs');
const path = require('path');

const dbFile = path.join(__dirname, 'db.json');
const fixtures = {
  flows: require('./fixtures/flows.json'),
  steps: require('./fixtures/steps.json'),
  providers: require('./fixtures/providers.json')
};

// Reset the database with fixtures
fs.writeFileSync(dbFile, JSON.stringify(fixtures), {encoding: 'utf-8'});
// fs.exists(dbFile, exists => {
//   if (!exists) {
//     fs.writeFileSync(dbFile, JSON.stringify(dbContent), {encoding: 'utf-8'});
//   }
// });
