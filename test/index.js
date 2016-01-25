require('dotenv').load({ path: `${__dirname}/../.env.test` });

require('./models/document-test');
require('./controllers/user-ctrl-test');
require('./controllers/doc-ctrl-test');
