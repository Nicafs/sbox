#!/usr/bin/env python3
import os
import re
import sys
import semver
import subprocess


def git(*args):
    return subprocess.check_output(["git"] + list(args))


def bump(latest, versions_label):
    if "#major" in versions_label:
        return semver.bump_major(latest)
    if "#minor" in versions_label:
        return semver.bump_minor(latest)
    if "#patch" in versions_label:
        return semver.bump_patch(latest)
    raise ValueError(
        "A label must be informed in the merge request, one of: #major, #minor or #patch"
    )


def main():
    """
    Return next semver tag for the existing tag or empty if commit
    is already tagged.
    """
    try:
        versions_label = sys.argv[1]
    except IndexError:
        versions_label = "#patch"

    try:
        latest = git("describe", "--tags").decode().strip()
        if latest[0] == "v":
            latest = latest[1:]
    except subprocess.CalledProcessError:
        # No tags in the repository
        version = "v0.0.1"
    else:
        # Skip already tagged commits
        if "-" not in latest:
            print(latest)
            return 0

        version = f"v{bump(latest, versions_label)}"

    print(version)
    return 0


if __name__ == "__main__":
    sys.exit(main())
