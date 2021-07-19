### 操作指令
#### 基本操作
* 1. `git init`
  2. `git add xxxx.txt`
  3. `git commit -m "first commit"`
  4. `git remote add origin https://xxxxxxxx/xxx.git` 添加本地仓库和远程仓库之间的联系
  5. `git push -u origin master -f` `-f` 强制推送, `--force`简写,  `-u` `--set-upstream` 的简写
  6. `git remote set-url origin https://xxxx/xxxxx.git` 替换仓库联系
  7. `git remote prune origin` 清除本地分支缓存(线上没有的那些分支的缓存)--在你需要根据最新的dev分支生成最新分支的时候使用
  8. `git push origin dev:dev_xyq -f` 把当前分支的内容 push 到线上dev_xyq分支 -f 可选

  9. `git remote rm origin` 移除本地关联远程分支, 然后进行第4步 重新关联
#### 其他操作
* `git log` 查看提交日志
* `git log --pretty=oneline` 查看提交日志 精简模式
* `git log --graph --abbrev-commit` 图形模式, 查看日志提交情况 `--abbrev-commit` 减少 hash 长度

* `git reset --hard HEAD^` 回退到上一版本 `^`代表上一版本, `^^`代表上上版本, 以此类推
* `git reset --hard hash值` 回退到指定版本
* `git reflog` 记录你的每一次命令

* `git rm xxxx.txt` 删除某个文件
* `git checkout -- xxxx.txt 或 git checkout -- .`  删错了, 可以还原(也可用于撤销修改)
* `git checkout -b dev origin/dev` 获取远程分支到本地
* `git branch --set-upstream-to=origin/dev dev` 关联远程 `dev` 分支和本地 `dev` 分支


* `git branch dev` 创建 `dev` 分支
* `git checkout dev` 切换到 `dev` 分支, 如果没有该xxx分支, 则从remote中找, 没有找到 则失败
* `git checkout -b dev`  创建 `dev` 分支, 然后切换到 `dev` 分支, 相当于上面2条指令的合集

* `git merge xxx` 把**指定分支**合并到**当前分支**
* `git branch -d dev` 删除分支

* `git merge --no-ff -m "merge with no-ff" dev` 保留 `dev commit 点` 的合并方式

* `git stash` 保存工作现场
* `git stash list` 查看工作现场列表
* `git stash apply stash@{0}` 恢复第0项
* `git stash drop stash@{0}` 删除第0项
* `git stash pop` 恢复第一项, 并删除

* `git cherry-pick <commit_id>` 复制一个特定的提交到当前分支

* `git rebase`
    1. rebase 之前需要将 master 分支拉到最新
    2. 切换分支到需要 rebase 的分支, 这里是 dev 分支
    3. 执行 git rebase master 有冲突就解决冲突, 解决后直接 git add  再 git rebase --continue 即可
    4. git rebase origin/dev   将现在所在的分支 rebase 到 远程 dev 上
    
* `git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"` 设置 `git log` 的别名 `git lg`

* `git tag <name>` 打标签
* `git tag` 查看所有标签
* `git tag <name> <commit_id>` 指定某个提交打标签
* `git show <tagname>` 查看某个标签的信息
* `git tag -a v0.1 -m "version 0.1 released" <commit_id>` 然后 `git show <tgbname>` 可以看到说明文字 `-a` 指定标签名, `-m` 指定说明文字 
* `git tag -d <tagname>` 删除指定tag, 删除远程的话， 先删本地, 然后 `git push origin :refs/tags/v0.9`
* `git push origin <tagname>`  推送标签 或一次性推送全部 `git push origin --tags`

* `git push origin -d dev_xyq` 删除远程分支
