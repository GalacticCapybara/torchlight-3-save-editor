# torchlight-3-save-editor

A save editor for the Torchlight 3 Singleplayer version.

## how to use

```sh
# on the Frontiers folder
#   Windows: %localappdata%\Frontiers\
#   Linux: <steamlibrary>\steamapps\common\<torchlight 3 install dir>\Frontiers

# 1 - export save game files
npx torchlight-3-save-editor -p . export

# 2- edit JSON in <documents>/torchlight-3-save-editor

# 3 - import save game files
npx torchlight-3-save-editor -p . import
```
