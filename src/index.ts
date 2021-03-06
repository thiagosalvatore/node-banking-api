import './settings';
import 'reflect-metadata';
import logger from 'jet-logger';
import server from './infrastructure/api/server';

// Constants
const serverStartMsg = 'Express server started on port: ',
    port = process.env.PORT || 3000;

// Start server
server.listen(port, () => {
    logger.info(serverStartMsg + port);
});
