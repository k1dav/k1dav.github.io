---
title: "DeepSpeed 多節點訓練設置教學（JupyterLab 版本）"
slug: "/playbooks/deepspeed-多節點訓練設置教學-jupyterlab-版本"
tags:
  - "DeepSpeed"
  - "DistributedTraining"
  - "LLM"
  - "MLOps"
  - "GPU"
  - "JupyterLab"
  - "PyTorch"
  - "AI"
  - "MachineLearning"
---
## DeepSpeed 多節點訓練設置教學（JupyterLab 版本）

本教學旨在詳細說明如何在多節點環境中，利用 DeepSpeed 框架進行大規模模型的分散式訓練，並整合 JupyterLab 作為開發介面。

## 核心架構

此設定的核心是建立一個包含所有必要依賴（CUDA, Python, OpenMPI, SSH, JupyterLab）的 Docker 環境。所有訓練節點都將運行此 Docker 映像檔。主節點 (Master Node) 會額外運行 JupyterLab 服務，並透過 OpenMPI 和無密碼 SSH 連線來啟動和協調所有從節點 (Worker Nodes) 上的訓練任務。

## 先決條件

- **多台具備 NVIDIA GPU 的主機**: 所有主機的硬體和軟體環境（特別是驅動程式版本）應盡可能一致。
- **Docker 與 NVIDIA Container Toolkit**: 所有主機都需安裝 Docker 和 NVIDIA Container Toolkit，以支援 GPU 容器。
- **共享儲存 (建議)**: 一個所有節點都能存取的共享儲存（如 NFS），用於存放訓練資料、程式碼和模型檢查點，以簡化管理。
- **網路連線**: 所有節點之間需要有高速、低延遲的網路連線，並確保節點間的 SSH 端口 (22) 和 DeepSpeed 通訊端口 (預設 29500) 是開放的。

## 1. 配置文件準備

### 1.1. `requirements.txt`
此檔案列出了專案所需的 Python 套件。

```txt
--find-links https://download.pytorch.org/whl/cu126
torch>=2.0.0+cu126
torchvision>=0.15.0+cu126
torchaudio>=2.0.0+cu126
numpy>=1.24.0
pandas>=2.0.0
jupyterlab
jupyterlab-language-pack-zh-TW
jupyter-server-proxy
ipywidgets
jupyter-resource-usage
deepspeed
```

### 1.2. `ds_config.json` (DeepSpeed 配置檔案)
此 JSON 檔案定義了 DeepSpeed 訓練的相關參數。

```json
{
  "train_micro_batch_size_per_gpu": 1,
  "gradient_accumulation_steps": 8,
  "optimizer": {
    "type": "Adam",
    "params": {
      "lr": 1e-4,
      "betas": [
        0.9,
        0.99
      ]
    }
  },
  "scheduler": {
    "type": "WarmupDecayLR",
    "params": {
      "total_num_steps": 500000,
      "warmup_min_lr": 0,
      "warmup_max_lr": 1e-4,
      "warmup_num_steps": 1000
    }
  }
}
```

## 2. Docker 環境建構

### 2.1. `Dockerfile`
此 Dockerfile 用於建構包含所有必要依賴的訓練環境映像檔。

```dockerfile
# 使用 NVIDIA CUDA 基礎映像
FROM nvidia/cuda:12.8.0-cudnn-devel-ubuntu22.04
WORKDIR /app

# 安裝系統依賴
RUN apt-get update && apt-get install -y \
    git python3-pip openssh-server openssh-client nodejs npm openmpi-bin openmpi-common libopenmpi-dev \
    && rm -rf /var/lib/apt/lists/*

# 配置 SSH 服務
RUN mkdir /var/run/sshd
RUN echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config
RUN echo 'StrictHostKeyChecking no' >> /etc/ssh/ssh_config

# 設置 SSH 用戶和密碼 (!!! 警告：生產環境請使用 SSH 金鑰 !!!)
ENV SSH_USER=deepspeed
ENV SSH_PASSWORD=deepspeed123
RUN useradd -m -s /bin/bash ${SSH_USER} && \
    echo "${SSH_USER}:${SSH_PASSWORD}" | chpasswd && \
    echo "${SSH_USER} ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
RUN mkdir -p /home/${SSH_USER}/.ssh && \
    chmod 700 /home/${SSH_USER}/.ssh && \
    chown -R ${SSH_USER}:${SSH_USER} /home/${SSH_USER}/.ssh

# 安裝 Python 依賴
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# 設定環境變數
ENV CUDA_VISIBLE_DEVICES=all
ENV NCCL_DEBUG=INFO
ENV NOTEBOOK_FOLDER=/workspace
ENV JUPYTER_TOKEN=your_secure_token

# 複製訓練代碼
COPY . .
EXPOSE 8888 22

# 創建啟動腳本
RUN echo '#!/bin/bash\n\
/usr/sbin/sshd\n\
jupyter lab --ip=0.0.0.0 --port=8888 --allow-root --no-browser --ServerApp.token=${JUPYTER_TOKEN}' > /app/start.sh && \
    chmod +x /app/start.sh

CMD ["/app/start.sh"]
```

### 2.2. 建立與部署映像
在所有節點上建構或拉取此映像檔，確保環境一致。

```bash
# 建立映像
docker build -t deepspeed-training:jupyter .
# (可選) 推送到私有倉庫
# docker push your-registry/deepspeed-training:jupyter
```

## 3. 容器運行與 SSH 設定

### 3.1. 啟動容器
在所有節點上啟動容器。主節點需要映射 JupyterLab 的 8888 端口。

```bash
# 在主節點上運行
docker run --gpus all -d --network host -v /path/to/shared_storage:/workspace --name deepspeed-master deepspeed-training:jupyter

# 在從節點上運行
docker run --gpus all -d --network host -v /path/to/shared_storage:/workspace --name deepspeed-worker deepspeed-training:jupyter
```

### 3.2. 設定無密碼 SSH
進入**主節點**的容器，產生 SSH 金鑰並分發到所有從節點（包括主節點自己）。

```bash
# 進入主節點容器
docker exec -it deepspeed-master bash

# 在容器內執行
ssh-keygen -t rsa -f ~/.ssh/id_rsa -N ""
# 將公鑰複製到所有節點
ssh-copy-id -i ~/.ssh/id_rsa.pub deepspeed@<worker1_ip>
ssh-copy-id -i ~/.ssh/id_rsa.pub deepspeed@<worker2_ip>
# ...
ssh-copy-id -i ~/.ssh/id_rsa.pub deepspeed@<master_ip> # 包括自己
```

## 4. 開始訓練

### 4.1. `hostfile` 設定
在主節點的共享儲存區建立一個 `hostfile`，列出所有參與訓練的節點及其 GPU 數量。

```text
# /workspace/hostfile
<master_ip> slots=8
<worker1_ip> slots=8
<worker2_ip> slots=8
```

### 4.2. 訓練腳本 (`train.py`)
準備您的 PyTorch 訓練腳本，並使用 DeepSpeed 進行初始化。

### 4.3. 啟動訓練
從主節點的 JupyterLab 終端機或 `docker exec` 進入的 shell 中，執行以下命令啟動訓練。

```bash
deepspeed --hostfile=/workspace/hostfile \
          --master_addr=<master_ip> \
          train.py --deepspeed --deepspeed_config ds_config.json
```

## 總結
本教學提供了一個在多節點環境中使用 DeepSpeed 和 JupyterLab 進行大規模模型訓練的完整流程。核心步驟包括：建立一個包含所有依賴的標準化 Docker 環境，設定節點間的無密碼 SSH 通訊，以及使用 `deepspeed` 啟動器和 `hostfile` 來協調分散式訓練。雖然設定過程較為複雜，但一旦完成，就能為大規模 AI 模型的研發提供一個強大且可擴展的平台。
