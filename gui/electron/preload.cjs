// Expedient Employment — preload bridge
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  doctor: () => ipcRenderer.invoke('doctor'),
  services: () => ipcRenderer.invoke('services'),
  servicesStart: (service) => ipcRenderer.invoke('services:start', { service }),
  searchSpawn: (args) => ipcRenderer.invoke('search:spawn', args),
  onSearchLog: (cb) => {
    const listener = (_e, payload) => cb(payload);
    ipcRenderer.on('search:log', listener);
    return () => ipcRenderer.removeListener('search:log', listener);
  },
  jobsRead: () => ipcRenderer.invoke('jobs:read'),
  reportOpen: () => ipcRenderer.invoke('report:open'),
  agentsList: () => ipcRenderer.invoke('agents:list'),
  configRead: (name) => ipcRenderer.invoke('config:read', name),
  configWrite: (name, text) => ipcRenderer.invoke('config:write', name, text),
  sessionsRead: () => ipcRenderer.invoke('sessions:read'),
  awbLaunch: () => ipcRenderer.invoke('awb:launch'),
  loginUrl: (siteKey) => ipcRenderer.invoke('login:url', siteKey),
});
