#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync } from 'fs';

const input = process.argv[2] || 'assets/gopro.mp4';
const overlay = process.argv[3] || 'assets/chupacabra.png';
const output = process.argv[4] || 'chupacabra_pov.mp4';

if (!existsSync(input)) {
  console.error(`Input video not found: ${input}`);
  process.exit(1);
}

if (!existsSync(overlay)) {
  console.error(`Overlay image not found: ${overlay}`);
  process.exit(1);
}

const cmd = [
  'ffmpeg',
  '-i', input,
  '-loop', '1',
  '-i', overlay,
  '-filter_complex',
  "[1:v]crop=iw:ih*0.6:0:ih*0.4[ov];[0:v][ov]overlay=(main_w-w)/2:(main_h-h)/2",
  '-t', '180',
  '-c:a', 'copy',
  '-y',
  output,
].join(' ');

execSync(cmd, { stdio: 'inherit' });
