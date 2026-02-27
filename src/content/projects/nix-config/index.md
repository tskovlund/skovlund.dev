---
title: "nix-config"
description: "Declarative Nix environment with flakes, nix-darwin, and home-manager across macOS and Linux."
sortOrder: 2
featured: true
icon: "simple-icons:nixos"
iconColor: "#7ebae4" # NixOS brand blue
repoURL: "https://github.com/tskovlund/nix-config"
---

My entire computing environment — shell, editor, git, SSH, secrets, fonts, the lot — declared as code in a single [Nix](https://nixos.org) flake. One command rebuilds everything from scratch. No manual setup, no configuration drift, no "works on my machine." I've introduced this on new machines twice now and been productive within minutes. The repo is a [GitHub template](https://github.com/tskovlund/nix-config) — use it to create your own, swap out the personal layer, and you have a fully working dev environment.

## Multi-platform

The same repo drives four targets from a shared core:

- **macOS** via [nix-darwin](https://github.com/LnL7/nix-darwin) — system defaults, Homebrew casks, Mac App Store apps
- **Linux** via standalone [home-manager](https://github.com/nix-community/home-manager) — pure user environment, no root needed
- **NixOS-WSL** — full NixOS on Windows Subsystem for Linux
- **NixOS VPS** ([miles](/projects/miles-vps)) — Hetzner Cloud server with observability, backups, and AI infrastructure

Each platform pulls from shared home-manager modules, with platform-specific layers on top.

## Profile splitting

The config splits into **base** and **personal** profiles. The base profile is a complete development environment — shell, editor, git, CLI tools — that works on any machine. The personal profile layers on: SSH hosts, personal casks, anything tied to my identity.

This makes the base config portable. A new team member could use it as a starting point without inheriting my personal setup.

## Secrets

Secrets use [agenix](https://github.com/ryantm/agenix) — age-encrypted at rest, decrypted at activation time. The encrypted `.age` files live in a separate [nix-config-personal](https://github.com/tskovlund/nix-config-personal) repo — which is public, because the whole point of age encryption is that ciphertext is safe to share. You're welcome to go browse my secrets. Please let me know if you crack them.

## AI agent skills

The personal repo also contains my [agent skills](https://github.com/tskovlund/nix-config-personal/tree/main/skills) — plaintext instruction sets that extend what the AI agent can do, covering everything from issue triage to PR review loops to documentation writing. See the [skills reference](https://github.com/tskovlund/nix-config-personal/blob/main/skills/README.md) for the full list. Each skill is a markdown file deployed to `~/.claude/skills/` via home-manager. Adding a new one is just writing a file, wiring it into Nix, and running `make switch`.

The repo itself is maintained with [Claude Code](https://github.com/anthropics/claude-code) — agent teams for parallel work, autonomous PR reviews, and conventional commits. CI runs `nix flake check` on every push across both Linux and macOS.
