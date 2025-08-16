module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "style", // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
        "patch", // Backward-compatible bug fixes
        "build", // Changes that affect the build system
      ],
    ],
  },
};
