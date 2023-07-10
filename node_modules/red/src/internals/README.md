# `red/internals/*`

> **GO AWAY, THESE ARE INTERNAL FUNCTIONS**

How to use our internals in 3 simple steps:

1. YOU DON'T
2. Follow step 1.

We removed step 3 without warning. Your app is now broken, good job.
Consider all functionality under the `red/internals/*` to be private and
break with each patch version of our publish. This is your final warning:

> **GO AWAY, THESE ARE INTERNAL FUNCTIONS**

## `red/internals/displayname`

Assigns or modifies a components `displayName`.

## `red/internals/typeof`

A better `typeof` which can differentiate between the different Objects.

## `red/internals/clone`

Creates a snapshot of a data structure, it has specific optimisations for
cloning our [`red/state`][state].

## `red/internals/constants`

Collections of `Symbols`, constants that we use througout the library.

[state]: ../state/README.md
