'use strict';
/**
 * db-adapter.js
 * Drop-in compatibility layer for sqlite3 using Node.js built-in node:sqlite.
 * Requires NODE_OPTIONS=--experimental-sqlite (Node.js 22.x) or Node.js 23+.
 * No native compilation — works on any GLIBC version.
 */

const { DatabaseSync } = require('node:sqlite');

function openDatabase(dbPath) {
  const db = new DatabaseSync(dbPath);

  function normalize(params) {
    if (!params || (Array.isArray(params) && params.length === 0)) return [];
    return Array.isArray(params) ? params : [params];
  }

  return {
    run(sql, params, callback) {
      if (typeof params === 'function') { callback = params; params = []; }
      if (params === undefined) params = [];
      try {
        const stmt = db.prepare(sql);
        const info = stmt.run(...normalize(params));
        if (callback) callback.call({ lastID: Number(info.lastInsertRowid || 0), changes: info.changes || 0 }, null);
      } catch (err) {
        console.error('DB run error:', err.message, '|', sql.substring(0, 80));
        if (callback) callback.call({ lastID: 0 }, err);
      }
    },

    get(sql, params, callback) {
      if (typeof params === 'function') { callback = params; params = []; }
      if (params === undefined) params = [];
      try {
        const stmt = db.prepare(sql);
        const row = stmt.get(...normalize(params));
        if (callback) callback(null, row || undefined);
      } catch (err) {
        console.error('DB get error:', err.message, '|', sql.substring(0, 80));
        if (callback) callback(err);
      }
    },

    all(sql, params, callback) {
      if (typeof params === 'function') { callback = params; params = []; }
      if (params === undefined) params = [];
      try {
        const stmt = db.prepare(sql);
        const rows = stmt.all(...normalize(params));
        if (callback) callback(null, rows || []);
      } catch (err) {
        console.error('DB all error:', err.message, '|', sql.substring(0, 80));
        if (callback) callback(err);
      }
    },

    exec(sql, callback) {
      try {
        db.exec(sql);
        if (callback) callback(null);
      } catch (err) {
        console.error('DB exec error:', err.message);
        if (callback) callback(err);
      }
    },

    // node:sqlite is synchronous — serialize just calls fn immediately
    serialize(fn) {
      if (typeof fn === 'function') fn();
    },

    close(callback) {
      try {
        db.close();
        if (callback) callback(null);
      } catch (err) {
        if (callback) callback(err);
      }
    }
  };
}

module.exports = { openDatabase };
