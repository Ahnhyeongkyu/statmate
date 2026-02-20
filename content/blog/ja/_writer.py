# -*- coding: utf-8 -*-
import os

base = "C:/Users/anHye/Documents/products/statmate/content/blog/ja"

files = {}

files["simple-vs-multiple-regression.mdx"] = """\
---
title: "\u5358\u56de\u5e30\u3068\u91cd\u56de\u5e30\uff1a\u305d\u308c\u305e\u308c\u306e\u4f7f\u3044\u5206\u3051"
description: "\u5358\u56de\u5e30\u5206\u6790\u3068\u91cd\u56de\u5e30\u5206\u6790\u306e\u5305\u62ec\u7684\u306a\u6bd4\u8f03\u3002\u30e2\u30c7\u30eb\u9078\u629e\u3001\u591a\u91cd\u5171\u7dda\u6027\u3001\u8abf\u6574\u6e08\u307fR\u4e8c\u4e57\u3001\u4e88\u6e2c\u5909\u6570\u306e\u8ffd\u52a0\u304c\u30e2\u30c7\u30eb\u3092\u6539\u5584\u3059\u308b\u5834\u5408\u3068\u60aa\u5316\u3055\u305b\u308b\u5834\u5408\u306b\u3064\u3044\u3066\u89e3\u8aac\u3057\u307e\u3059\u3002"
date: "2026-02-20"
category: "\u691c\u5b9a\u6bd4\u8f03"
tags:
  - \u5358\u56de\u5e30
  - \u91cd\u56de\u5e30
  - \u7dda\u5f62\u56de\u5e30
  - \u591a\u91cd\u5171\u7dda\u6027
  - \u30e2\u30c7\u30eb\u9078\u629e
  - \u6c7a\u5b9a\u4fc2\u6570
  - VIF
  - \u4e88\u6e2c\u5909\u6570
---

test content
"""

for name, content in files.items():
    path = os.path.join(base, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Wrote {name}: {os.path.getsize(path)} bytes")
