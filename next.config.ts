import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const [repositoryOwner = "", repositoryName = ""] =
  process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isAccountSite =
  repositoryName.toLowerCase() ===
  `${repositoryOwner.toLowerCase()}.github.io`;
const basePath =
  isGitHubPagesBuild && repositoryName && !isAccountSite
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = isGitHubPagesBuild
  ? {
      output: "export",
      trailingSlash: true,
      basePath,
      images: {
        unoptimized: true,
      },
      env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
      },
    }
  : {
      env: {
        NEXT_PUBLIC_BASE_PATH: "",
      },
    };

export default nextConfig;
