Thanks for your interest in contributing to this project! This document aims to serve as a friendly guide for making your first contribution.

# Running locally

Install deps
```
npm i
```

Build an run site
```
npm run dev
```

If you get rate limited by github, you can pass a github token.

```
GH_TOKEN=**** npm run dev
```

# Deploying

After a PR has been created, a member of the balena team will review and merge into master.

Shortly after merging to master it'll automatically be deployed to our [staging environment](https://balena-os-staging.herokuapp.com/) (This should only take a few minutes).

Once deployed to staging, you can preview your changes. If everything looks good, a member of the balena team will make another PR from master into the production branch. When this is merged, the changes will automatically deploy to production.
