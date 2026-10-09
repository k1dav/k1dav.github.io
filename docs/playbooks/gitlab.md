---
title: "Gitlab"
slug: "/playbooks/gitlab"
tags:
  - "GitLab"
  - "DevOps"
  - "CI-CD"
  - "Git"
  - "VCS"
  - "DevSecOps"
---
## GitLab：一站式 DevOps 平台

GitLab 是一個提供完整 DevOps 生命週期的單一應用程式，它不僅僅是一個 Git 版本控制的倉庫管理工具，更整合了從專案規劃、原始碼管理到 CI/CD、監控和安全性的所有功能。

## 核心功能

1.  **原始碼管理 (Source Code Management)**:
    -   基於 Git 的版本控制系統，提供強大的分支管理、合併請求 (Merge Requests) 和程式碼審查 (Code Review) 功能。

2.  **持續整合/持續交付 (CI/CD)**:
    -   內建強大且高度可設定的 CI/CD 功能，開發者只需在專案根目錄下建立一個 `.gitlab-ci.yml` 檔案，即可定義自動化的建構、測試和部署流程。
    -   提供 GitLab Runner，可以在多種平台上執行 CI/CD 的任務。

3.  **專案管理 (Project Management)**:
    -   提供議題追蹤 (Issue Tracking)、史詩 (Epics)、里程碑 (Milestones) 和看板 (Issue Boards) 等功能，幫助團隊規劃、組織和追蹤工作進度。

4.  **套件庫 (Package Registry)**:
    -   內建多種套件管理庫，例如：Container Registry (用於 Docker 映像檔)、NPM Registry、Maven Repository 等，讓團隊可以集中管理專案的依賴項和產出物。

5.  **安全性與合規性 (Security & Compliance)**:
    -   提供一系列的安全掃描工具，包括：
        -   **SAST** (靜態應用程式安全測試)
        -   **DAST** (動態應用程式安全測試)
        -   **相依性掃描** (Dependency Scanning)
        -   **容器掃描** (Container Scanning)
    -   這些功能可以整合到 CI/CD 流程中，實現 DevSecOps。

## GitLab Flow 工作流程

GitLab 推薦一個基於功能分支 (Feature Branch) 的工作流程，稱為 "GitLab Flow"，它比傳統的 Git Flow 更為簡潔：
1.  **主分支 (main) 即為生產分支**: `main` 分支永遠是穩定且可隨時部署的。
2.  **從主分支建立功能分支**: 當要開發新功能或修復錯誤時，從 `main` 分支建立一個新的功能分支。
3.  **在功能分支上開發**: 在自己的分支上進行開發和提交。
4.  **建立合併請求 (Merge Request)**: 開發完成後，建立一個合併請求，將功能分支合併回 `main` 分支。
5.  **程式碼審查與自動化測試**: 在合併請求中，團隊成員可以進行程式碼審查，同時 CI/CD 會自動運行測試。
6.  **合併與部署**: 審查通過且所有測試都成功後��將功能分支合併到 `main` 分支，並自動部署到生產環境。

## GitLab vs. GitHub

| 特性 | GitLab | GitHub |
| :--- | :--- | :--- |
| **核心定位** | 一個完整的 DevOps 平台 | 專注於程式碼託管和開發者社群 |
| **CI/CD** | 內建且功能強大 | 透過 GitHub Actions 提供 |
| **部署方式** | 提供 SaaS (gitlab.com) 和自架設 (Self-hosted) 版本 | 主要為 SaaS (github.com)，也提供企業級自架設版本 |
| **開源策略** | 核心功能開源，提供付費的企業版 | 許多核心功能為閉源，但廣泛用於開源專案 |

## 總結
GitLab 以其一站式的 DevOps 解決方案，成功地將開發、維運和安全整合在單一平台中。對於追求高效率、流程自動化和完整掌控權的團隊來說，GitLab 無疑是一個極具吸引力的選擇，特別是其強大的 CI/CD 和自架設彈性，使其在企業級應用中佔有一席之地。
