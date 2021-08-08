const core = require('@actions/core');
const github = require('@actions/github');

async function doAsyncAction() {
  try {
    const token = core.getInput("repo-token", { required: true });

    if (!github.context.payload.pull_request) {
      core.setFailed("PR payload retrieval failed."); // could just be a throw since in a try already *shrug
      return;
    }
    const pr_number = github.context.payload.pull_request.number;
    const octokit = github.getOctokit(token);

    const pullResponse = await octokit.rest.pulls.get({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: pr_number
    });
    const pr_title = pullResponse.data.title;

    const stripped_title = pr_title.replace(/([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2000-\u3300]|[\u00A9-\u00AE]|[\uFE0F])/g, '');
    if (pr_title !== stripped_title) {
      await octokit.rest.pulls.update({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: pr_number,
        title: (stripped_title === '') ? "(blank emojiless)" : stripped_title  // just incase some joker puts only emoji, PR titles can not blank
      });
    }
  } catch (error) {
    core.setFailed("Action failed. Error: " + error.message);
  }
}

doAsyncAction();
