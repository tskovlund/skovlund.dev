---
title: "Cambr"
description: "Algorithmic trading framework built on evolutionary computation — strategies evolve through AI-driven mutation, crossover, and selection."
sortOrder: 6
featured: true
icon: "dna"
iconColor: "green"
---

Unlike traditional genetic algorithms that optimize parameter vectors, Cambr evolves entire strategy codebases. Code is the genome. An AI agent "tunes" a strategy by writing _different code_, not by tweaking numbers. This means the search space includes entirely novel approaches — not just variations of a predefined template.

The name — **C**ompetitive **A**lgorithmic **M**utation **B**ot **R**eactor — is a nod to the [Cambrian explosion](https://en.wikipedia.org/wiki/Cambrian_explosion), the moment in evolutionary history when biological diversity detonated. Cambr applies the same principle to trading strategies.

## Why

Part curiosity, part stress-test. Algorithmic trading is an interesting domain because the feedback loop is merciless — overfitting is easy, edge is fragile, and the market doesn't care about elegant code. I wanted to see how far generative AI could push the envelope when given a well-defined contract and a fitness function, and what breaks first.

## How it works

The evolution loop:

1. **Load** a population of strategy modules
2. **Evaluate** fitness using walk-forward backtesting — in-sample/out-of-sample splits to detect overfitting
3. **Select** top performers based on a composite risk-adjusted score
4. **Evolve** — AI agents generate children via mutation (tweak one parent), crossover (combine two parents), or genesis (invent from scratch)
5. **Validate** and cull — children must compile, pass contract checks, and clear minimum viability thresholds
6. Repeat

Strategies implement a minimal contract: pure functions from market data to entry/exit signals. No internal state, no side effects, deterministic. This keeps the search space tractable for AI generation while making overfitting easy to detect.

## Status

Active development. The full pipeline works end-to-end: population initialization, fitness evaluation, selection, and multi-strategy evolution — all automated.

Cambr is a private project. The competitive nature of algorithmic trading means publishing the full system would undermine its edge. That said, the framework contains components — the backtest engine, strategy contract, fitness evaluation — that aren't competitive on their own. I plan to open-source those pieces selectively once the boundaries are well-defined.
