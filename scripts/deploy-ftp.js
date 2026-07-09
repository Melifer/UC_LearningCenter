#!/usr/bin/env node
/*
  Deploy pełnej aplikacji (backend + frontend) na serwer FTP.
  Struktura na serwerze:
    /learning/
      server.js           ← backend/server.js
      package.json        ← backend/package.json
      utils/              ← backend/utils/
      fonts/              ← backend/fonts/
      client/
        dist/             ← client/dist/ (Vite build)
        public/
          images/         ← client/public/images/
      docs/               ← docs/

  Wymagane zmienne środowiskowe (.env lub środowisko systemu):
    FTP_HOST, FTP_USER, FTP_PASS

  Opcjonalne:
    FTP_PORT        – domyślnie 21
    FTP_REMOTE_DIR  – domyślnie /learning
    FTP_DEBUG       – "1" dla verbose
*/

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const ftp = require('basic-ftp');
const fs  = require('fs');
const path = require('path');

(async () => {
  const ROOT  = path.resolve(__dirname, '..');
  const DIST  = path.join(ROOT, 'client', 'dist');
  const BACK  = path.join(ROOT, 'backend');

  if (!fs.existsSync(DIST)) {
    console.error('❌  client/dist/ nie istnieje. Uruchom najpierw: cd client && npm run build');
    process.exit(1);
  }

  const host      = process.env.FTP_HOST;
  const port      = Number(process.env.FTP_PORT || 21);
  const user      = process.env.FTP_USER;
  const pass      = process.env.FTP_PASS;
  const remoteDir = process.env.FTP_REMOTE_DIR || '/learning';
  const debug     = process.env.FTP_DEBUG === '1' || process.env.FTP_DEBUG === 'true';

  if (!host || !user || !pass) {
    if (!host) console.error('❌  Brakuje FTP_HOST');
    if (!user) console.error('❌  Brakuje FTP_USER');
    if (!pass) console.error('❌  Brakuje FTP_PASS');
    console.error('   Sprawdź plik .env oraz czy FTP_PASS jest wyeksportowane w .zshrc (export FTP_PASS=...)');
    process.exit(1);
  }

  const client = new ftp.Client();
  client.ftp.verbose = debug;

  try {
    console.log(`\n🚀  Łączenie z ftp://${host}:${port} ...`);
    await client.access({ host, port, user, password: pass, secure: false });

    // Zachowaj pliki z docs/sources/ których nie ma lokalnie (wgrane przez użytkowników)
    const localSourcesDir = path.join(ROOT, 'docs', 'sources');
    const localSourceNames = new Set(
      fs.existsSync(localSourcesDir) ? fs.readdirSync(localSourcesDir) : []
    );
    const preservedSources = []; // { name, tmpPath }
    try {
      const remoteList = await client.list(`${remoteDir}/docs/sources`);
      for (const entry of remoteList) {
        if (!entry.isDirectory && !localSourceNames.has(entry.name)) {
          const tmpPath = path.join(require('os').tmpdir(), `_deploy_src_${entry.name}`);
          await client.downloadTo(tmpPath, `${remoteDir}/docs/sources/${entry.name}`);
          preservedSources.push({ name: entry.name, tmpPath });
        }
      }
      if (preservedSources.length > 0)
        console.log(`💾  Zachowuję ${preservedSources.length} plik(ów) z docs/sources/ (wgrane przez użytkowników)`);
    } catch (_) { /* docs/sources/ może jeszcze nie istnieć na serwerze */ }

    // Wyczyść katalog przed uplodem
    console.log(`🧹  Czyszczenie ${remoteDir} ...`);
    await client.ensureDir(remoteDir);
    await client.clearWorkingDir();

    // 1. server.js
    console.log(`⬆️   server.js`);
    await client.uploadFrom(path.join(BACK, 'server.js'), 'server.js');

    // 2. package.json
    console.log(`⬆️   package.json`);
    await client.uploadFrom(path.join(BACK, 'package.json'), 'package.json');

    // 3. utils/
    const utilsDir = path.join(BACK, 'utils');
    if (fs.existsSync(utilsDir)) {
      console.log(`⬆️   utils/`);
      await client.ensureDir(`${remoteDir}/utils`);
      await client.uploadFromDir(utilsDir, `${remoteDir}/utils`);
    }

    // 4. fonts/
    const fontsDir = path.join(BACK, 'fonts');
    if (fs.existsSync(fontsDir)) {
      console.log(`⬆️   fonts/`);
      await client.ensureDir(`${remoteDir}/fonts`);
      await client.uploadFromDir(fontsDir, `${remoteDir}/fonts`);
    }

    // 5. client/dist/ (Vite build)
    console.log(`⬆️   client/dist/`);
    await client.ensureDir(`${remoteDir}/client/dist`);
    await client.uploadFromDir(DIST, `${remoteDir}/client/dist`);

    // 6. client/public/images/ jeśli istnieje
    const imagesDir = path.join(ROOT, 'client', 'public', 'images');
    if (fs.existsSync(imagesDir)) {
      console.log(`⬆️   client/public/images/`);
      await client.ensureDir(`${remoteDir}/client/public/images`);
      await client.uploadFromDir(imagesDir, `${remoteDir}/client/public/images`);
    }

    // 7. docs/ jeśli istnieje
    const docsDir = path.join(ROOT, 'docs');
    if (fs.existsSync(docsDir)) {
      console.log(`⬆️   docs/`);
      await client.ensureDir(`${remoteDir}/docs`);
      await client.uploadFromDir(docsDir, `${remoteDir}/docs`);
    }

    // 7b. Przywróć pliki wgrane przez użytkowników do docs/sources/
    if (preservedSources.length > 0) {
      console.log(`♻️   Przywracam ${preservedSources.length} plik(ów) do docs/sources/ ...`);
      await client.ensureDir(`${remoteDir}/docs/sources`);
      for (const { name, tmpPath } of preservedSources) {
        if (fs.existsSync(tmpPath)) {
          await client.uploadFrom(tmpPath, `${remoteDir}/docs/sources/${name}`);
          fs.unlinkSync(tmpPath);
        }
      }
    }

    // 8. Restart Passenger (touch tmp/restart.txt)
    console.log(`🔄  Restartowanie aplikacji (tmp/restart.txt) ...`);
    const tmpFile = path.join(require('os').tmpdir(), 'restart.txt');
    fs.writeFileSync(tmpFile, new Date().toISOString());
    await client.ensureDir(`${remoteDir}/tmp`);
    await client.uploadFrom(tmpFile, `${remoteDir}/tmp/restart.txt`);
    fs.unlinkSync(tmpFile);

    console.log('\n✅  Deploy zakończony pomyślnie. Aplikacja zostanie zrestartowana automatycznie.\n');
  } catch (err) {
    console.error('❌  Deploy nie powiódł się:', err.message || err);
    process.exitCode = 1;
  } finally {
    client.close();
  }
})();
