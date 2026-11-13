import { test } from 'vitest';
import assert from 'node:assert/strict';
import { deriveFold } from '../fold/geometry';
import { buildBriefText, validateBrief } from './brief';

test('validateBrief enforces required trimmed projectName, valid room enum, and notes limit', () => {
  const emptyErrors = validateBrief({ projectName: ' ', room: '', notes: '' });
  assert.equal(emptyErrors.projectName, 'Enter a project name with 2 to 80 characters.');
  assert.equal(emptyErrors.room, 'Choose a room type.');
  assert.equal(emptyErrors.notes, undefined);

  const shortErrors = validateBrief({ projectName: ' A ', room: 'InvalidRoom', notes: 'x'.repeat(501) });
  assert.equal(shortErrors.projectName, 'Enter a project name with 2 to 80 characters.');
  assert.equal(shortErrors.room, 'Choose a room type.');
  assert.equal(shortErrors.notes, 'Keep notes to 500 characters.');

  const validErrors = validateBrief({ projectName: '  Studio North  ', room: 'Workspace', notes: 'x'.repeat(500) });
  assert.deepEqual(validErrors, {});
});

test('buildBriefText captures custom colors, print, motif scale, and optional upload filename', () => {
  const pose = deriveFold(75);
  const text = buildBriefText(
    {
      projectName: '  Studio North  ',
      room: 'Workspace',
      notes: 'Keep <script> literal\nSecond line',
    },
    {
      design: {
        opening: 75,
        baseHex: '#32AA77',
        designHex: '#4B202A',
        print: 'landscape',
        motifScale: 125,
      },
      view: { yawDeg: 180, elevationDeg: 14 },
    },
    pose.metrics,
  );

  assert.match(text, /Project name: Studio North/);
  assert.match(text, /Room: Workspace/);
  assert.match(text, /Base color: #32AA77/);
  assert.match(text, /Print: Landscape/);
  assert.match(text, /Print color: #4B202A \(Oxblood\)/);
  assert.match(text, /Artwork zoom: 125%/);
  assert.match(text, /Opening: 75%/);
  assert.match(text, /Outer span: 2\.24 m/);
  assert.match(text, /Support depth: 0\.38 m/);
  assert.match(text, /Preview view: Back \(180° · 14° tilt\)/);
  assert.match(text, /Keep <script> literal/);

  const uploadText = buildBriefText(
    { projectName: 'Atelier', room: 'Living space', notes: '' },
    {
      design: {
        opening: 50,
        baseHex: '#D8C4A7',
        designHex: '#4B202A',
        print: 'upload',
        motifScale: 100,
      },
      view: { yawDeg: 34, elevationDeg: 20 },
      uploadedImageName: 'botanical-print.png',
    },
    deriveFold(50).metrics,
  );
  assert.match(uploadText, /Your image: botanical-print\.png \(local session only\)/);
  assert.doesNotMatch(uploadText, /Print color:/);

  const tintedUploadText = buildBriefText(
    { projectName: 'Atelier', room: 'Living space', notes: '' },
    {
      design: {
        opening: 50,
        baseHex: '#D8C4A7',
        designHex: '#4B202A',
        print: 'upload',
        motifScale: 100,
        tintUpload: true,
      },
      view: { yawDeg: 34, elevationDeg: 20 },
      uploadedImageName: 'botanical-print.png',
    },
    deriveFold(50).metrics,
  );
  assert.match(tintedUploadText, /Print color: #4B202A \(Oxblood\)/);
});
