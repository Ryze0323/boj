

![image1](./image/rebase/image.png)

미리 다섯 개의 커밋이 들어있는 리포지터리를 생성한다.

```bash
git rebase -i ${수정할 커밋의 직전 커밋}
```

**리베이스할 커밋의 직전 커밋**에는 내가 수정하고 싶은 커밋의 바로 직전 커밋을 입력하면 된다. 즉, 세 번째 커밋을 수정하고 싶다면 두 번째 커밋을 넣으면 된다. 이 때 커밋 해시를 넣는 방법도 가능하고, HEAD를 기준으로 입력할 수도 있다.

```bash
# 커밋 해시를 이용한 방법
git rebase -i b55bd745

# HEAD를 이용한 방법
git rebase -i HEAD~3
```

이렇게 입력하게 되면, 터미널에서 다음처럼 출력되는 볼 수 있다.

![image1](./image/rebase/image1.png)

일반적인 로그 메시지가 **아래에서부터 위로 출력**되는 것에 반해, 여기에서는 **위에서부터 아래로** 커밋 순서가 출력되어 있는 것을 확인할 수 있다. 그리고 각 라인은 `[명령어] [커밋 해시] [커밋 메시지]` 순서대로 구성되어 있다. 종료시킬 때, Git은 각 커밋에 적용시킬 명령어들을 읽은 후, 스크립트를 한 줄씩 실행시킨다.

아래에는 주석이 있는데 Command, 즉 각 커밋에 사용할 수 있는 명령어들의 목록을 확인할 수 있다. 특정 커밋에 명령어를 사용하기 위해서는 직접 vim 에디터로 커밋 해시 앞의 명령어를 수정한다. 만약 위의 사진에서 네 번째 커밋에 한해 `edit` 명령어를 적용시키고 싶다면, 아래처럼 수정하면 된다.

![image2](./image/rebase/image2.png)

## pick

> p, pick `<commit>` = use commit

`pick` 또는 `p` 는 **해당 커밋을 수정하지 않고 그냥 사용하겠다 라는 명령어**이다. 디폴트로 실행되는 명령어이므로 내용을 편집하지 않고 종료한다면 아무런 변경 사항 없이 리베이스가 종료된다.

이런 특성을 가진 `pick`을 이용해서 커밋 순서을 재정렬하거나, 아예 커밋을 삭제하는 용도로 사용할 수도 있다.

![image3](./image/rebase/image3.png)

세 번째 커밋과 네 번째 커밋의 순서를 변경한 상태로, 종료한다.

![image4](./image/rebase/image4.png)

커밋의 순서가 변경된 것을 확인할 수 있다.

![image5](./image/rebase/image5.png)

해당 커밋이 포함된 라인을 지운 후, 종료하면 간단하게 커밋이 삭제된다.

![image6](./image/rebase/image6.png)

해당 커밋이 히스토리에서 사라진 것을 확인할 수 있다.

> 다만 수정한 커밋 히스토리가 서로 의존성을 갖고 있는 경우에는 컨플릭트가 발생할 수 있기 때문에, 이를 위한 별도의 처리가 필요하다는 점.

## reword

> r, reword `<commit>` = use commit, but edit the commit message

`reword` 또는 `r` 는 **커밋 메시지를 수정하기 위한 명령어**이다.

![image6](./image/rebase/image7.png)

네 번째 커밋의 커밋 메시지를 변경해보도록 하겠습니다. `reword` 명령어를 입력한 후 vim을 종료하면,

![image8](./image/rebase/image8.png)

이처럼 커밋 메시지를 vim에서 수정할 수 있다.

![image9](./image/rebase/image9.png)

저는 커밋 제목에 `(reword로 수정)` 이라는 단어를 더 붙여서 저장한다.

![image10](./image/rebase/image10.png)

커밋 히스토리에서도 수정된 커밋 메시지가 잘 나타나는 것을 확인할 수 있다.

## edit

> e, edit `<commit>` = use commit, but stop for amending

`edit` 또는 `e` 는 **커밋의 명령어 뿐만 아니라 작업 내용도 수정할 수 있게 하는 명령어**이다. 아래 예제에서는 커밋 메시지와 작업 내용을 수정하고, 그와 동시에 하나의 커밋을 두 개로 분리하거나 커밋을 끼워넣는 과정이다.

![image11](./image/rebase/image11.png)

이전 예시에서 사용한 커밋을 수정해한다. 명령어 `edit` 을 이용해보면…

![image12](./image/rebase/image12.png)

해당 커밋으로 HEAD가 옮겨진 것을 확인할 수 있다. Git에서 커밋 메시지를 수정하려면 `git commit --amend`를, 수정을 완료했다면 `git rebase --continue` 명령어를 입력한다. 우선 커밋 메시지를 수정하면 어떻게 나오는지 보기 위해 `git commit --amend`를 입력해본다.

![image13](./image/rebase/image13.png)

아까와 `reword` 명령어와 마찬가지로, 커밋 메시지를 수정할 수 있다.

![image14](./image/rebase/image14.png)

커밋 메시지를 수정하고 저장하면 커밋 메시지가 바뀐것을 확인 할 수 있다.

![image15](./image/rebase/image15.png)

이제 현재 커밋 상태에서 커밋을 추가하고 리베이스를 이어서 진행한다.

![image17](./image/rebase/image17.png)

새 텍스트 파일을 만든 후,

![image16](./image/rebase/image16.png)

 `git add`와 `git commit -m message` 명령어를 이용해 새 커밋을 추가했다.

![image18](./image/rebase/image18.png)

새 작업이 네 번째 커밋 뒤에 추가된 것을 확인할 수 있습니다.

![image19](./image/rebase/image19.png)

`git rebase --continue` 명령어를 이용해 리베이스를 진행 한다. 

이 edit를 통해 과거의 커밋으로 이동한 다음 커밋을 분리 및 추가가 가능하다.

## squash, fixup

> s, squash `<commit>` = use commit, but meld into previous commit
>
> f, fixup `<commit>` = like “squash”, but discard this commit’s log message

`squash`와 `s`, `fixup`과 `f`는 **해당 커밋을 이전 커밋과 합치는 명령어**이다

다만 두 명령어 사이에는 차이점이 있다. `squash` 는 각 커밋들의 메시지가 합쳐지는 반면, `fixup` 은 이전의 커밋 메시지만 남기는 차이점이 있다.

지금부터는 `squash`를 이용해 위에서 만들었던 3와 ½ 번째 커밋을 다시 세 번째 커밋으로 합쳐보도록 한다.

![image20](./image/rebase/image20.png)

3와 ½ 번째 커밋에 `squash` 명령어를 적용한다.

![image21](./image/rebase/image21.png)

세 번째 커밋과 3와 ½ 번째 커밋의 메시지를 확인하실 수 있다. 필요에 따라 커밋 메시지를 수정할 수도 있다.

![image22](./image/rebase/image22.png)

 두 커밋이 합쳐진 것을 확인할 수 있다. 3와 ½ 번째 커밋의 메시지는 commit description 으로 들어간 것 역시 확인할 수 있다.

## exec

> x, exec `<command>` = run command (the rest of the line) using shell

`exec` 또는 `x` 는 **리베이스 도중에 실행할 쉘 커맨드를 입력할 수 있게 해주는 명령어**이다.

![image23](./image/rebase/image23.png)

예시로, 저는 직전 커밋의 메시지만을 출력하는 커맨드(`git log -1 --pretty=format:%B`)를 한 번 스크립트 사이에 넣었다.

![image24](./image/rebase/image24.png)

`Executing` 으로 실행할 명령어가 나오고, 결과가 정상적으로 잘 출력되는 것을 확인할 수 있다.

## break

> b, break = stop here (continue rebase later with ‘git rebase —continue’)

`break` 또는 `b` 는 그냥 말 그대로 **해당 라인에서 리베이스를 일시중지하는 명령어**이다.

![image25](./image/rebase/image25.png)

예시를 보여드리자면, 이렇게 스크립트 사이에 `break`를 넣어주면

![image26](./image/rebase/image26.png)

이렇게 직전 커밋까지 리베이스를 마친 후 일시중지한 상태가 되며

![image27](./image/rebase/image27.png)

현재 HEAD의 상태를 커밋 히스토리에서도 확인할 수 있다. 다시 재개하려면 `git rebase --continue` 를 입력하면 된다.

## drop

> d, drop `<commit>` = remove commit

`drop` 또는 `d` 는 **해당 커밋을 명시적으로 삭제하는 명령어**이다. 위에서 `pick` 명령어로 삭제하는 것과 동일한 결과물이 나온다.

![image28](./image/rebase/image28.png)

두 번째 커밋과 다섯 번째 커밋 앞에 `drop` 명령어를 붙이면

![image29](./image/rebase/image29.png)

이렇게 흔적도 없이 커밋이 사라진다.

## merge

> m, merge [-C `<commit>` or -c `<commit>`] `<label>` [# `<oneline>`]
>
> create a merge commit using the original merge commit’s
>
> message (or the oneline, if no original merge commit was

`merge` 또는 `m` 옵션은 **머지 커밋을 만들면서 머지하는 명령어**이다.

![image30](./image/rebase/image30.png)

먼저 merge-test 브랜치에서 여섯번째 커밋 파일을 만들어 둔다.

![image31](./image/rebase/image31.png)

rebase-test으로 온 후, 작업한 `b2c4b7fab` 커밋을 가져와서 리베이스 중간 단계에 머지시켜보도록 한다.

![image32](./image/rebase/image32.png)

요렇게 머지 커밋을 작성할 수 있게 에디터가 열리게 되고, 

![image33](./image/rebase/image33.png)

커밋 로그에서도 남게 된다.
