const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const secret = 'YOUR_WEBHOOK_SECRET'; // **IMPORTANT: Replace with a strong secret**

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/webhook') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const signature = req.headers['x-hub-signature-256'];
            if (!signature) {
                console.error('Webhook signature missing!');
                res.statusCode = 401;
                return res.end('Signature missing');
            }

            const hmac = crypto.createHmac('sha256', secret);
            const digest = 'sha256=' + hmac.update(body).digest('hex');

            if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
                console.log('Webhook signature verified!');
                res.statusCode = 200;
                res.end('Webhook received and verified.');

                // Execute deployment commands
                try {
                    console.log('Starting git pull...');
                    await executeCommand('git pull origin main');
                    console.log('git pull completed.');

                    console.log('Starting docker compose up --d --build...');
                    await executeCommand('docker compose up -d --build');
                    console.log('docker compose up completed.');
                    console.log('Deployment successful!');
                } catch (error) {
                    console.error('Deployment failed:', error);
                }

            } else {
                console.error('Webhook signature verification failed!');
                res.statusCode = 401;
                res.end('Signature verification failed');
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd: '/opt/my-app' }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${command}`);
                console.error(stderr);
                reject(error);
                return;
            }
            console.log(`Command output: ${command}`);
            console.log(stdout);
            resolve(stdout);
        });
    });
}

const WEBHOOK_PORT = 8001; // Choose a port for the webhook receiver (different from app port 3000)
server.listen(WEBHOOK_PORT, () => {
    console.log(`Webhook receiver listening on port ${WEBHOOK_PORT}`);
});