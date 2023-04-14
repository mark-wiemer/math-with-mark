# Testing and Deployment

All tests are run manually for now. Obviously I want to change that soon.

Each stage comes with a set of preprocessing steps before the tests can be run. Once the tests pass one stage, move on to the next one.

## Tests

-   Manual sanity checks
    -   No warnings or errors in console (Ctrl + Shift + I)
    -   Stuff renders appropriately (looks good at all sizes)
    -   All links work
-   Accessibility assessment passes
-   No typos in newly-added content

## Stage 0: Code Review

In this stage, the code is reviewed in a diff viewer to make sure it matches style guidelines and good engineering practices. None of the above tests are run.

-   Is the code formatted appropriately?
-   Does the design match good engineering principles (SOLID, GRASP, etc.)?
-   Is it tested?
-   Is it documented?

## Stage 1: Unit Testing

1. `npm test`
    1. Ensure there is no extraneous output
    1. Ensure code coverage remains at 100%

## Stage 2: Localhost Testing

1. `npm start`
    1. There should be no warnings during compilation
1. Navigate to `https://localhost:3000`
1. Perform manual sanity checks, consider adding automated UI tests at this point

## Stage 3: Build Testing

1. Update "Last updated" message on [the home page](../src/pages/Home.tsx)
1. `npm run build && serve -s build`
1. Navigate to `https://localhost:5000`
1. Perform manual sanity checks
1. Perform accessibility assessment

## Stage 4: PR Completion

1. Open a PR (or continue the existing one)
1. Review all the changes once more (now that all tests pass)
1. If the code needs to be updated before completion, restart from stage 0.
1. Complete the PR

## Stage 5: Deployment

1. From the dev branch, deploy the merged feature to the live site with `npm run deploy`.
1. Navigate to `mathwithmark.com` (Ideally this site would change away from the production site)
1. Refresh the page until the "Last updated" message reflects the new time (should take less than five minutes)
1. Perform manual sanity checks
1. Perform accessibility assessment
    1. If anything fails, take note of all failures. Then, revert the changes and re-deploy the old site.
    1. If nothing fails, congratulations! You've just completed a feature!

## Stage 6: Resolving an Issue

If a user detects a potential issue when using the site, follow this process:

1. Try the basic fixes
    1. Clear browser cache
    1. Try different browsers
    1. Restart computer
1. If the issue persists, log the issue.
1. Do not revert changes until the cause of the issue can be determined.
1. Depending on the severity of the issue, revert changes or open a hotfix branch for the issue.

## Future Testing Plans

Ideally there would be a separate development site, but for now the development site _is_ the production site.

Also, we should automate the testing of links working.
