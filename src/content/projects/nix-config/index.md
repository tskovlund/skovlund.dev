---
title: "nix-config"
description: "Declarative Nix environment with flakes, nix-darwin, and home-manager across macOS and Linux."
date: "Feb 09 2026"
featured: true
cover: "./cover.png"
coverLight: "./cover-light.png"
repoURL: "https://github.com/tskovlund/nix-config"
---

My entire computing environment — shell, editor, git config, SSH, secrets, system defaults, [Homebrew](https://brew.sh) casks, fonts, and more — declared as code in a single [Nix](https://nixos.org) flake. One command rebuilds everything from scratch. No manual setup, no configuration drift, no "works on my machine."

## Multi-platform

The same repo drives four platforms from a shared core:

- **macOS** via [nix-darwin](https://github.com/LnL7/nix-darwin) — system defaults, Homebrew casks, Mac App Store apps
- **Linux** via standalone [home-manager](https://github.com/nix-community/home-manager) — pure user environment, no root needed
- **NixOS-WSL** — full [NixOS](https://nixos.org) on Windows Subsystem for Linux
- **NixOS VPS** ([miles](/projects/miles-vps)) — [Hetzner Cloud](https://www.hetzner.com/cloud/) server with observability, backups, and AI infrastructure

Each platform pulls from a shared set of home-manager modules, with platform-specific layers added on top.

## Profile splitting

The config splits into **base** and **personal** profiles. The base profile is a complete development environment — shell, editor, git, CLI tools — that works on any machine. The personal profile layers on top: personal SSH hosts, personal casks, and anything tied to my identity.

This makes the base config portable. A new team member could use it as a starting point without inheriting my personal setup.

## Secrets

Secrets (SSH keys, API tokens, encrypted config files) use [agenix](https://github.com/ryantm/agenix) — age-encrypted at rest, decrypted at activation time. A single portable age key shared across machines handles decryption.

The encrypted `.age` files live in a separate [nix-config-personal](https://github.com/tskovlund/nix-config-personal) repo — which is public, because the whole point of age encryption is that ciphertext is safe to share. You're welcome to go browse my secrets. Let me know if you crack them.

## Bootstrap

A curl-pipeable `bootstrap.sh` script takes a fresh machine from zero to fully configured: installs Nix, clones the repo, generates or migrates the age key, and runs the first deploy. On NixOS-WSL, it handles a two-phase build when the bootstrap user differs from the target user.

## AI-augmented workflow

The repo is maintained with [Claude Code](https://github.com/anthropics/claude-code) — agent teams for parallel work, autonomous PR review loops, and conventional commits. CI runs `nix flake check` on every push across both Linux and macOS. Git hooks enforce formatting and linting on commit, with a full build check on push.
