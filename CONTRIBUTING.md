Thanks for your interest in contributing to this project! This document aims to serve as a friendly guide for making your first contribution.

# Running locally

This site requires a (any) github API key to build.

Install deps
```
npm i
```

Build an run site
```
gulp GH_TOKEN=<github_api_token> GH_USERNAME=<github_api_user> gulp dev
```

# Deploying

Send a PR, when an admin approves and merges, the site is automatically built and deployed by travis.
