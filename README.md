# Emoji Stripper Action
A GitHub action for removing emoji from PR content with regex replace.

## Usage

Create a workflow (eg: `.github/workflows/emoji_strip.yml` see [Creating a Workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file))

### Example workflow
This will strip emoji from new PR titles and any text _after_ the Changelog heading only, for any branch, when created or edited.
```
name: "PR Emoji Stripper"
on:
  pull_request:
    types: [opened, edited]

jobs:
  title_and_body:
    runs-on: ubuntu-20.04
    steps:
    - uses: Wayland-Smithy/emoji-stripper-action@master
      with:
        repo-token: ${{ secrets.GITHUB_TOKEN }}
        title: true
        body: true
        body-after: "## Changelog"
```

_Note: This grants access to the `GITHUB_TOKEN` so the action can make calls to GitHub's rest API to fetch and edit PR data._

### body-before and body-after inputs
If neither `body-after` or `body-before` are provided with `body` then the entire text will be parsed.

If both `body-after` and `body-before` are provided they must result in an overlap to be valid i.e. for "a-b-c-d" `body-after: "a"` and `body-before: "c"` is valid and only "-b-" will be parsed.

If `body-after` or `body-before` are provided but not found, invalid, or appear in the wrong order no emoji will be removed from the body and the run will succeed with a no match info log.
