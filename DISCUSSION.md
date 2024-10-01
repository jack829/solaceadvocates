# Things I'd like to continue working on, in no particular order

## UI/UX

- Smoother loading
- Handle more screen sizes
- Propogate more informative error messages
- More delightful colors
- Handle light/dark mode

## API

- Cleaner search through non-text database fields, specifically `specialties`
- Validation on the search parameter
- More thorough and purposeful error handling

## Architecture

- Pull the data fetching and handling out of the Home page and instead wrap the component tree in a data provider layer that is updated by a reducer function (Redux, React's context api, etc)

## Performance

- Add a limit to the amount of data fetched at one time. This could be handled by loading more Advocates on scroll or via pagination. These parameters would then be used in the `limit` and `offset` query options.

## Testing

- End to end, component, integration, snapshot to name a few. To me, end to end is the most effective for ensuring product requirements are delivered.
