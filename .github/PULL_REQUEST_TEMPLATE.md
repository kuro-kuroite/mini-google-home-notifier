<!-- PULL REQUEST TEMPLATE -->
<!-- (Update "[ ]" to "[x]" to check a box) -->

**どの種類のPR?** (check at least one)

- [ ] 作業中(WIP)
- [ ] バグ修正
- [ ] 機能改善・追加
- [ ] コードスタイルによる修正
- [ ] Refactor
- [ ] ビルド関連の変更
- [ ] Other, please describe:

**このPRは大きな変化をもたらしますか？** (check one)

- [ ] Yes
- [ ] No

**どの部分を中心に確認してほしいのか. どんなフィードバックを望んでいるのか.** (check at least one)

- [ ] コードに目を通して欲しい
- [ ] 技術的な議論がしたい
- [ ] 設計について批評してほしい
- [ ] 文言を確認してほしい
- [ ] Other, please describe:

### 問題の背景・目的(一言で目的を伝えるならば)

<!-- 変数のスコープを限定し，デバッグをしやすくするため -->

### 問題の概要. 何が問題か(一言で問題を伝えるならば)

<!-- message変数が様々な場所から呼ばれる可能性がある -->

### 問題の経緯(可能な限り過去から現在の状況と今後起こりうる可能性を詳細に)

<!-- 今まで，開発のスピードを重視してコードの可読性を無視してきた．-->
<!-- いよいよ，複雑になっていき一度整理を行う必要が出てきた．-->
<!-- 現在，message文字列をグローバル領域に持っている -->
<!-- そのため，message変数が様々な場所から呼ばれる可能性がある -->
<!-- 変数のスコープを限定し，デバッグや機能追加をしやすくするため -->

### 期待されるふるまい

<!-- Tell us what should happen -->
```

```

### 実際のふるまい

<!-- Tell us what happens instead -->
```

```

### 再現のサンプルコード(可能ならば)

```

```

### System configuration

- OS version:
- Node.js version:
- npm version:
- {{.RepoName}} version:

### Other information

<!-- you want to write anything -->
<!-- mention -->
