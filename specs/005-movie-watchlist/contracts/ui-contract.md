# UI Contract: Movie Watchlist

## Shared DOM Contract

The implementation keeps the base IDs `#item-form`, `#form-error`, `#summary-text`, `#filter-section`, `#item-list`, and `#empty-state`. `render()` is the only function that writes list, summary, filter-active, empty, or no-results DOM state.

## Input Contract

| User input | Accepted value | Result |
|------------|----------------|--------|
| Title | Non-empty trimmed text | Create or update the Movie title |
| Genre | User-entered text | Create or update the Movie genre |
| Release year | User-entered text | Set when creating the Movie |
| Search query | Any text | Immediately narrows visible cards by title |
| Filter | `all`, `unwatched`, `watched` | Shows the corresponding status view |
| Rating | Integer 1 through 5 | Updates a watched Movie only |

## Card Action Contract

Each rendered Movie card exposes actions associated with its Movie ID:

| Action | Preconditions | Result |
|--------|---------------|--------|
| Toggle watched | Movie exists | Switches its `watched` value |
| Edit | Movie exists | Lets the user update title and genre |
| Rate | Movie exists and is watched | Sets rating from 1 through 5 |
| Delete | Movie exists | Removes only that Movie |
| Clear watched | At least one watched Movie exists | Removes every watched Movie and no unwatched Movie |

## Display Contract

- A watched card has a clear visual status label or styling distinct from an unwatched card.
- The summary reports watched and remaining counts from all Movies, independent of the current filter or query.
- With no Movies, the UI shows the welcome empty state.
- With Movies but no visible search/filter result, the UI shows the no-results message.
- Title text wraps inside the card; card layout is multi-column when space permits and one-column on small screens.
