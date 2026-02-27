---
title: "mcp-score"
description: "AI-powered music notation — describe what you want in plain English, get a publication-ready score in MuseScore, Dorico, or Sibelius."
sortOrder: 5
featured: true
icon: "music"
iconColor: "accent"
repoURL: "https://github.com/tskovlund/mcp-score"
---

Describe what you want in plain English — get a publication-ready score. [mcp-score](https://github.com/tskovlund/mcp-score) bridges AI coding agents and professional notation software, turning natural language into real music notation.

> "Create a big band chart — 32-bar AABA form, key of Bb, slow blues at 66 BPM, with rhythm changes and rehearsal marks at each section."

Claude Code writes a complete [music21](https://web.mit.edu/music21/) script, executes it, and hands you a MusicXML file ready to open in MuseScore, Dorico, Sibelius, or any notation app.

With the MuseScore plugin running, you can go further:

> "Read the melody in bars 9–16 and arrange it as a trombone soli following the chord progression."

Claude reads the live score, applies musical intelligence, and writes the arrangement back — all through natural language.

## Two approaches, one workflow

**Score generation** uses a [Claude Code skill](https://docs.anthropic.com/en/docs/claude-code/skills) — Claude writes music21 Python scripts that export MusicXML. No MCP round-trips needed. Full access to the entire music21 API in a single script, which is faster and more flexible than calling individual tools.

**Live score manipulation** uses an [MCP](https://modelcontextprotocol.io) server with 18 tools for reading from and writing to a running score application. A QML plugin runs a WebSocket server inside MuseScore, enabling real-time two-way communication. The same protocol supports Dorico and Sibelius via their Remote Control APIs.

Generation creates scores from scratch. Manipulation refines them in place. Together they cover the full composition workflow.

## Why this exists

I play trombone in [Nordkraft Big Band](https://nordkraftbigband.dk) and have been writing arrangements for years. The gap between having a musical idea and getting it into notation software has always been frustrating — you hear the voicing in your head, but transcribing it means clicking through menus, entering notes one by one, and fighting with transposing instruments.

I realized this was exactly the kind of problem an AI agent could solve in a single focused session. So I described what I wanted, went for a run, and came back to a working prototype. mcp-score grew from there.

It understands transposing instruments, voice leading, jazz harmony, and standard arranging conventions. The result is a real score you can rehearse from — not a rough sketch that needs hours of cleanup. Published on [PyPI](https://pypi.org/project/mcp-score/) — install with `pip install mcp-score`.
