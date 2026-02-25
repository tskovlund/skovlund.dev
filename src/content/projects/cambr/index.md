---
title: "Cambr"
description: "Algorithmic trading framework built on evolutionary computation — strategies evolve through AI-driven mutation, crossover, and selection."
date: "Feb 22 2026"
featured: true
---

**C**ompetitive **A**lgorithmic **M**utation **B**ot **R**eactor — named after the [Cambrian explosion](https://en.wikipedia.org/wiki/Cambrian_explosion), the moment in evolutionary history when biological diversity detonated. Cambr applies the same principle to trading strategies: AI agents write strategy code (the genome), a custom backtest engine evaluates fitness, and natural selection keeps the best performers.

Unlike traditional genetic algorithms that optimize parameter vectors, Cambr evolves entire strategy codebases. Code is the genome. An AI agent "tunes" a strategy by writing _different code_, not by tweaking numbers. This means the search space includes entirely novel approaches — not just variations of a predefined template.

## How it works

The evolution loop:

1. **Load** a population of strategy modules
2. **Evaluate** fitness using walk-forward backtesting — in-sample/out-of-sample splits to detect overfitting
3. **Select** top performers based on a composite risk-adjusted score
4. **Evolve** — AI agents generate children via mutation (tweak one parent), crossover (combine two parents), or genesis (invent from scratch)
5. **Validate** and cull — children must compile, pass contract checks, and clear minimum viability thresholds
6. Repeat

Strategies implement a minimal contract: pure functions from market data to entry/exit signals. No internal state, no side effects, deterministic. This keeps the search space tractable for AI generation while making overfitting easy to detect.

## Stack

Python 3.13, [Claude](https://docs.anthropic.com/en/docs/about-claude/models) via Anthropic API / [OpenRouter](https://openrouter.ai) for strategy generation, [pandas](https://pandas.pydata.org)/[numpy](https://numpy.org) for the backtest engine, [ccxt](https://github.com/ccxt/ccxt) for exchange data, [Nix](https://nixos.org) + [uv](https://docs.astral.sh/uv/) for the dev environment.

## Status

Active development. The full pipeline works end-to-end: population initialization, fitness evaluation, selection, and multi-strategy evolution — all automated.

Cambr is a private project. The competitive nature of algorithmic trading means publishing the full system would undermine its edge. That said, the framework contains components — the backtest engine, strategy contract, fitness evaluation — that aren't inherently competitive on their own. I plan to selectively open-source those pieces in the future, once the boundaries are well-defined.
