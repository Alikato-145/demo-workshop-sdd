# Research: Movie Watchlist

## Decision 1: Keep the base static-page architecture

- **Decision**: Extend the existing root-level `index.html`, `style.css`, and `app.js` only.
- **Rationale**: The workshop explicitly requires vanilla browser technologies, no build process, and a page that runs as a static site.
- **Alternatives considered**: A framework or a separate module structure. Rejected because neither adds required user value and both violate the workshop constraints.

## Decision 2: Store one Movie collection locally

- **Decision**: Keep Movie records in one application state and persist them under an app-specific local browser key.
- **Rationale**: A single collection directly supports create, edit, delete, status, rating, search, filters, and summary without duplicate sources of truth.
- **Alternatives considered**: A backend service or multiple storage keys. Rejected by the storage constraint and because they add synchronization work without value for one local user.

## Decision 3: Derive the visible cards and summary from state

- **Decision**: Filter Movie records by the active status and case-insensitive title query during `render()`, then calculate watched and remaining counts from the same collection.
- **Rationale**: Derived display data cannot become stale after a create, edit, status change, or delete.
- **Alternatives considered**: Persisting a second filtered list or manually updating only affected DOM nodes. Rejected because both risk inconsistent UI and conflict with the single-render contract.

## Decision 4: Retain rating but restrict rating interaction to watched movies

- **Decision**: A rating is an integer from 1 through 5 and is displayed/editable only while a Movie is watched; switching back to unwatched hides the rating without deleting it.
- **Rationale**: This follows the explicit rating restriction while preserving a user's earlier preference if they correct a status accidentally.
- **Alternatives considered**: Clearing the rating whenever a Movie becomes unwatched. Rejected because the original requirement does not call for data loss.

## Decision 5: Use responsive CSS grid for cards

- **Decision**: Render cards in a grid that has multiple columns when space permits and a single column on small screens; long titles wrap inside their card.
- **Rationale**: Satisfies the desktop/mobile and long-text requirements without JavaScript layout logic.
- **Alternatives considered**: Fixed-width cards or JavaScript-controlled columns. Rejected because they are less responsive or add unnecessary complexity.
