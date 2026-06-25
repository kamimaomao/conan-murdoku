import { spawn } from 'node:child_process';

const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const args = ['run', 'dev:5176'];
const rapidExitWindowMs = 2000;
const maxRapidRestarts = 3;

let child;
let stopping = false;
let rapidRestarts = 0;
let restartTimer;

function start() {
  const startedAt = Date.now();
  child = spawn(command, args, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
  });

  child.on('exit', (code, signal) => {
    child = undefined;
    if (stopping) return;

    const ranForMs = Date.now() - startedAt;
    rapidRestarts = ranForMs < rapidExitWindowMs ? rapidRestarts + 1 : 0;

    if (rapidRestarts >= maxRapidRestarts) {
      console.error('[dev-keepalive] Vite keeps exiting immediately; check the logs above.');
      process.exit(typeof code === 'number' ? code : 1);
    }

    console.error(`[dev-keepalive] Vite exited (${signal ?? code}); restarting in 1s.`);
    restartTimer = setTimeout(start, 1000);
  });
}

function stop() {
  stopping = true;
  clearTimeout(restartTimer);
  if (child) child.kill('SIGTERM');
}

process.on('SIGINT', stop);
process.on('SIGTERM', stop);

start();
