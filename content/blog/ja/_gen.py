import os, base64, sys
base = "C:/Users/anHye/Documents/products/statmate/content/blog/ja"
def w(n, d):
  p = os.path.join(base, n)
  c = base64.b64decode(d).decode("utf-8")
  open(p, "w", encoding="utf-8").write(c)
  print(f"{n}: {os.path.getsize(p)} bytes, {c.count(chr(10))+1} lines")

