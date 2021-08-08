# Emoji Stripper Action
A GitHub action for removing emoji from PR titles.

## Usage

Create a workflow (eg: `.github/workflows/emoji_strip.yml` see [Creating a Workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file))

### Example workflow
This will strip emoji from new PR titles, for any branch, when created or edited.
```
name: "PR Title Emoji Strip"
on:
  pull_request:
    types: [opened, edited]

jobs:
  emoji_strip:
    runs-on: ubuntu-20.04
    steps:
    - uses: Wayland-Smithy/emoji-stripper-action@master
      with:
        repo-token: ${{ secrets.GITHUB_TOKEN }}
```

_Note: This grants access to the `GITHUB_TOKEN` so the action can make calls to GitHub's rest API to fetch and edit PR data_
