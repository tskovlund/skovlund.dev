---
title: "qed"
description: "Typed spec-driven development with deterministic verification and formally proven orchestration, written in Lean 4."
sortOrder: 3
featured: true
icon: "shield-check"
iconColor: "accent"
repoURL: "https://github.com/tskovlund/qed"
---

When an AI writes your code _and_ your tests, passing tests prove nothing — they inherit the same blind spots as the implementation. qed defines acceptance criteria as typed specs, verified independently of the agent that did the work.

## Two modes

**Worker loop** — run a worker (an AI agent, a build script, anything), verify each criterion, feed failures back, repeat until everything passes or the loop terminates. The orchestration is a formally proven state machine.

**Verify mode** — run each criterion once and report results. No worker, no loop — just verification. Used for CI and standalone checks.

## Verification spectrum

Not everything needs a formal proof, and not everything can get away with a shell script. qed supports a spectrum of verification strategies, from deterministic to probabilistic:

| Type          | Strategy                                     | Guarantee      |
| ------------- | -------------------------------------------- | -------------- |
| `command`     | Shell command, exit code                     | Deterministic  |
| `property`    | Hypothesis / QuickCheck                      | Statistical    |
| `proof`       | [Lean 4](https://lean-lang.org) / Coq / Agda | Mathematical   |
| `agentReview` | Independent LLM review                       | Probabilistic  |
| `human`       | Manual sign-off                              | Human judgment |

A single spec can mix all of these. The build must compile _and_ the state machine must be mathematically proven to terminate _and_ the code must pass an independent agent review — all in one verification pass.

## Formally proven

The core loop is a pure transition function in [Lean 4](https://lean-lang.org) with 8 theorems verified by Lean's kernel:

- **Termination** — the loop always reaches a terminal state within `maxIterations`
- **Stuck detection** — fires iff the same failures repeat for `stuckThreshold` consecutive iterations
- **No skipped verification** — worker output is always checked before passing
- **Worker ordering** — verification is only reachable from the worker-running state
- **Terminal states are absorbing** — once done, done
- **Monotonic iteration count** — iterations never go backwards
- **Verify mode separation** — verify mode cannot carry worker loop state
- **Independent of state machine** — verify mode does not use the transition function

No `sorry` (Lean's equivalent of "trust me, bro") anywhere in the proof modules. These aren't aspirational properties — they're mechanically checked by the compiler.

## What a spec looks like

```toml
name = "state-machine"

[worker]
command = "claude -p 'implement the state machine'"

[[criteria]]
description = "Project builds and tests pass"
verify = { type = "command", run = "lake build && lake test" }

[[criteria]]
description = "Transition function terminates"
verify = { type = "proof", prover = "lean4", target = "Qed.Proofs.Termination.transitionTerminates" }

[[criteria]]
description = "Code follows conventions"
verify = { type = "agentReview", prompt = "Check for pure functions and exhaustive matches." }
```

Specs are files in the repo — TOML or JSON, version-controlled, schema-validated. qed eats its own dogfood: the repo's own acceptance criteria are defined as [specs](https://github.com/tskovlund/qed/tree/main/specs).

## Status

Under active development, approaching v0.1.0. The core state machine, parser, verifier dispatch, and all formal proofs are complete. Open source under MIT.
