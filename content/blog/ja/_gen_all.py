# -*- coding: utf-8 -*-
import os, base64

base = "C:/Users/anHye/Documents/products/statmate/content/blog/ja"

def w(name, data):
    p = os.path.join(base, name)
    with open(p, "w", encoding="utf-8") as f:
        f.write(base64.b64decode(data).decode("utf-8"))
    lc = open(p, encoding="utf-8").read().count(chr(10)) + 1
    print(f"Wrote {name}: {os.path.getsize(p)} bytes, {lc} lines")

