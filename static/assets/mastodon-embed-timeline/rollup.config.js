import terser from "@rollup/plugin-terser";

export default [
  {
    input: "src/mastodon-timeline.js",
    output: [
      {
        file: "dist/mastodon-timeline.esm.js",
        format: "esm",
        sourcemap: false,
      },
      {
        name: "MastodonTimeline",
        file: "dist/mastodon-timeline.umd.js",
        format: "umd",
      },
    ],
    plugins: [terser()],
  },
];
