---
title: "Cambr"
description: "Evolutionary crypto trading — AI agents write strategy code, a backtest engine evaluates fitness, and natural selection does the rest."
date: "Feb 22 2026"
featured: true
repoURL: "https://github.com/tskovlund/cambr"
---

**C**ompetitive **A**lgorithmic **M**utation **B**ot **R**eactor — named after the [Cambrian explosion](https://en.wikipedia.org/wiki/Cambrian_explosion), the moment in evolutionary history when biological diversity detonated. Cambr aims for the same thing with trading strategies: AI agents write strategy code (the genome), a custom backtest engine evaluates fitness via walk-forward validation, and natural selection keeps the best performers. Unlike traditional genetic algorithms that optimize parameter vectors, Cambr evolves entire strategy codebases.

## How it works

The evolution loop:

1. **Load** a population of strategy modules (each one a Python file implementing a simple contract)
2. **Evaluate** fitness using walk-forward backtesting — 70% in-sample, 30% out-of-sample
3. **Select** top performers based on a composite score (Sharpe ratio, drawdown, return, win rate)
4. **Evolve** — AI agents generate children via mutation (tweak one parent), crossover (combine two parents), or genesis (invent from scratch)
5. **Validate** children (must parse, implement the contract, and survive a backtest)
6. **Cull** strategies that fail minimum viability thresholds
7. Repeat

The key insight: code is the genome. An AI agent "tunes" a strategy by writing _different code_, not by tweaking parameters. This means the search space includes entirely novel approaches — not just variations of a predefined template.

## The strategy contract

Strategies implement a minimal ABC. No constructor parameters, no internal state, no side effects. One class per file. Deterministic.

```python
class SmaCrossover(Strategy):
    @property
    def metadata(self) -> StrategyMetadata:
        return StrategyMetadata(
            name="sma_crossover",
            version="1.0.0",
            description="Buy when 10-SMA crosses above 50-SMA",
            parent_names=(),
        )

    def generate_signals(self, open, high, low, close, volume):
        fast = close.rolling(10).mean()
        slow = close.rolling(50).mean()
        entries = (fast > slow) & (fast.shift(1) <= slow.shift(1))
        exits = (fast < slow) & (fast.shift(1) >= slow.shift(1))
        return entries.fillna(False), exits.fillna(False)
```

This is intentionally restrictive. Strategies are pure functions from OHLCV data to boolean entry/exit signals — easy to reason about, easy for AI agents to generate, and impossible to cheat by peeking at future data.

## Walk-forward fitness

Every strategy is evaluated on data it has never "seen." The fitness engine splits the date range into in-sample (70%) and out-of-sample (30%), runs separate backtests on each, and scores based on out-of-sample performance only. In-sample metrics are tracked for overfitting detection — if a strategy performs dramatically better in-sample than out-of-sample, it's memorizing history rather than discovering a real edge.

A strategy must clear all viability thresholds to receive a non-zero score: at least 10 trades, positive risk-adjusted returns, and less than 50% max drawdown. The composite score weighs Sharpe ratio (40%), max drawdown (25%), total return (20%), and win rate (15%).

## Two-repo structure

- [**cambr**](https://github.com/tskovlund/cambr) (public, MIT) — the engine. Strategy contract, backtest engine, fitness evaluation, data layer, CLI.
- **cambr-strategies** (private) — the evolved organisms. Population of AI-generated strategy modules and generation results.

The engine is fully open. The strategies stay private — publishing profitable trading strategies is a self-defeating exercise.

## Stack

Python 3.13, [Claude](https://docs.anthropic.com/en/docs/about-claude/models) via Anthropic API / [OpenRouter](https://openrouter.ai) for strategy generation, [pandas](https://pandas.pydata.org)/[numpy](https://numpy.org) for the backtest engine (~175 lines), [ccxt](https://github.com/ccxt/ccxt) for exchange data, SQLite for caching, [Nix](https://nixos.org) + [uv](https://docs.astral.sh/uv/) for the dev environment, [pyright](https://github.com/microsoft/pyright) in strict mode, [ruff](https://github.com/astral-sh/ruff) for linting.

## Status

Active development. The full pipeline works end-to-end: `cambr evolve` generates an initial population via Claude, evaluates fitness, selects top performers, and evolves children through mutation, crossover, and genesis — all automated. Supports both Anthropic API and OpenRouter.
