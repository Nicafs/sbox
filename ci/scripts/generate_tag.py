#!/usr/bin/env python3
import os
import re
import subprocess
import sys


def git(*args):
    new_args = list(args)
    try:
        output = subprocess.check_output(["git"] + new_args)
        return output.decode("utf-8")
    except Exception as e:
        print(f"Error while executing git command: {new_args}. Error: {str(e)}")

def verify_tag(tag):
    tag_msg = f'Pipe {os.environ["CI_PIPELINE_ID"]} Build {os.environ["CI_BUILD_ID"]}'
    try:
        git(
            "tag",
            "-a",
            tag,
            "-m",
            tag_msg,
        )
    except Exception as e:
        print(f"Error while generating tag for testing. Error: {str(e)}")
        print(f"Deleting tag {tag}")
        git("tag", "-d", tag)
        git(
            "tag",
            "-a",
            tag,
            "-m",
            tag_msg,
        )


def tag_repo(tag):
    try:
        url = os.environ["CI_REPOSITORY_URL"]
        print(f"HTTPS repository url is {url}")

        # Transforms the repository URL to the SSH URL
        # Example input: https://gitlab-ci-token:xxxxxxxxxxxxxxxxxxxx@gitlab.com/threedotslabs/ci-examples.git
        # Example output: git@gitlab.com:threedotslabs/ci-examples.git
        push_url = re.sub(r".+@([^/]+)/", r"git@\1:", url)
        print(f"Obtained SSH repository url is {push_url}")

        git("remote", "set-url", "origin", push_url)
        git("push", "origin", tag)
    except Exception as e:
        raise ValueError(f"An error occurred while creating the tag. Error: {str(e)}")


def get_last_release() -> str:
    print("Getting last release")
    branches = git("branch", "-a")
    indices_sprints = [
        (m.start(), m.end()) for m in re.finditer(r"sprint-\d+", branches)
    ]
    sprint_numbers = []
    for s, e in indices_sprints:
        sprint_number = branches[s:e].split("-")[1]
        if sprint_number not in sprint_numbers:
            sprint_numbers.append(sprint_number)
    last_release = max(map(int, sprint_numbers))
    return f"sprint-{last_release}"


def merge_branch(branch_to_merge: str, commit_changes: bool = False):
    commit_msg = f'feat(ci): atualiza versão pública - Pipe {os.environ["CI_PIPELINE_ID"]} Build {os.environ["CI_BUILD_ID"]}'

    print(f"Merging current branch into {branch_to_merge}")
    git("fetch", "--tags", "-f")
    if commit_changes:
        git("add", ".")
        git("stash")
        git("checkout", branch_to_merge)
        # git("stash", "apply")
        git("checkout", "stash", "--", ".")
        git("commit", "-m", commit_msg)
    else:
        git("checkout", branch_to_merge)
        git("reset", "--hard", f"origin/{branch_to_merge}")
    git("merge", f'origin/{os.environ["CI_COMMIT_REF_NAME"]}')
    git("push", "origin", branch_to_merge)


def main():
    print(f"Received arguments {sys.argv}")
    try:
        sys.argv[1]
    except IndexError:
        raise ValueError("A version tag must be informed")

    git("config", "--global", "user.email", os.environ["GITLAB_USER_EMAIL"])
    git("config", "--global", "user.name", os.environ["GITLAB_USER_NAME"])

    version_tag = sys.argv[1]
    print(f"Received version tag is {version_tag}")

    print(f"Verifying if version tag already exists...")
    verify_tag(version_tag)

    print(f"Generating the new tag {version_tag}")
    tag_repo(version_tag)

    last_release = get_last_release()
    print(f"Last release is: {last_release}")
    merge_branch(last_release)

    # merge_branch("dev", commit_changes=True)
    merge_branch("dev")

    return 0


if __name__ == "__main__":
    sys.exit(main())