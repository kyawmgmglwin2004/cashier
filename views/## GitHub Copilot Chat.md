## GitHub Copilot Chat

- Extension Version: 0.27.0 (prod)
- VS Code: vscode/1.100.0
- OS: Windows

## Network

User Settings:
```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 20.205.243.168 (134 ms)
- DNS ipv6 Lookup: Error (48 ms): getaddrinfo ENOENT api.github.com
- Proxy URL: None (2 ms)
- Electron fetch (configured): HTTP 200 (298 ms)
- Node.js https: HTTP 200 (286 ms)
- Node.js fetch: HTTP 200 (282 ms)
- Helix fetch: HTTP 200 (309 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.114.21 (40 ms)
- DNS ipv6 Lookup: Error (83 ms): getaddrinfo ENOENT api.individual.githubcopilot.com
- Proxy URL: None (2 ms)
- Electron fetch (configured): HTTP 200 (938 ms)
- Node.js https: HTTP 200 (908 ms)
- Node.js fetch: HTTP 200 (911 ms)
- Helix fetch: HTTP 200 (1011 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).