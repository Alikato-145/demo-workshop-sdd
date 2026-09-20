# Data Model: Movie Watchlist

## Movie

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | string | yes | Unique identifier for the record |
| `title` | string | yes | Trimmed value; must not be empty |
| `genre` | string | no | User-entered display text; editable |
| `releaseYear` | string | no | User-entered display text; not changed by edit flow |
| `watched` | boolean | yes | Defaults to `false` |
| `rating` | integer or null | yes | `null` by default; values only 1 through 5; interaction available only when `watched` is true |
| `createdAt` | ISO 8601 timestamp | yes | Used to retain newest-first order |

## Application State

| Field | Type | Purpose |
|-------|------|---------|
| `items` | `Movie[]` | The only collection of watchlist records and persisted domain data |
| `filter` | `all`, `unwatched`, or `watched` | Current status view |
| `query` | string | Current title search text |

## Relationships and Derived Values

- Each Movie has exactly one watch status and zero or one rating.
- `visibleItems` is derived from `items` by applying the selected status filter and title query; it is never independently stored.
- `watchedCount` is the number of Movies whose `watched` value is true.
- `remainingCount` is the number of Movies whose `watched` value is false.

## State Transitions

| Event | Before | After |
|-------|--------|-------|
| Add Movie | no record | New Movie appears first with `watched: false` and `rating: null` |
| Toggle watched | `watched: false` | `watched: true`; rating control becomes available |
| Toggle unwatched | `watched: true` | `watched: false`; rating is retained but hidden and not editable |
| Set rating | Movie watched | `rating` becomes an integer from 1 to 5 |
| Clear watched | mixed collection | Only Movies with `watched: true` are removed |
