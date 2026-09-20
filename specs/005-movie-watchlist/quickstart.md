# Quickstart: Validate Movie Watchlist

## Prerequisites

- A current web browser.
- Run commands from the repository root on branch `team-5`.

## Start the app

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. Directly opening `index.html` is also supported.

## Validation scenarios

1. Add `Dune`, genre `Sci-Fi`, and year `2021`; then add `Parasite`. Confirm `Parasite` is displayed first and no blank-title submission creates a card.
2. Toggle `Dune` to watched. Confirm its status is visibly different, the watched/remaining summary updates, and rating controls appear only for `Dune`.
3. Set `Dune` to 5 stars, edit its title and genre, then refresh the page. Confirm the title, genre, watched status, and rating remain correct.
4. Search for a partial title and use all three filters. Confirm only matching cards appear and a nonmatching query shows the no-results message without deleting cards.
5. Add one watched and one unwatched Movie, then clear watched Movies. Confirm only watched Movies are removed. On a narrow browser width, confirm cards form one column and long titles do not overflow.

## Expected result

All scenarios complete without browser console errors; app state stays consistent after every action and after refresh.
