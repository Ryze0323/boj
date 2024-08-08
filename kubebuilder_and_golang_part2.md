
### 5. 매니페스트 생성

Kubebuilder를 사용하여 CRD 및 필요한 매니페스트 파일을 생성합니다.

```bash
make manifests
```

### 6. 컨트롤러 테스트 및 실행

로컬에서 컨트롤러를 실행하여 기능을 테스트합니다.

```bash
make run
```

### 7. 이미지 빌드 및 배포

컨트롤러의 도커 이미지를 빌드하고 Kubernetes 클러스터에 배포합니다.

```bash
make docker-build docker-push IMG=<your-image-repo>/monitor-operator:tag
make deploy IMG=<your-image-repo>/monitor-operator:tag
```

### 8. Custom Resource 생성 및 모니터링

모니터링할 URL을 지정하여 Monitor 리소스를 생성합니다.

```yaml
apiVersion: monitoring.example.com/v1
kind: Monitor
metadata:
  name: example-monitor
spec:
  url: https://example.com
```

이 파일을 `monitor.yaml`로 저장한 후, 클러스터에 적용합니다.

```bash
kubectl apply -f monitor.yaml
```

### 9. 결과 확인

생성된 Monitor 리소스의 상태를 확인하여 URL의 가용성 여부를 체크합니다.

```bash
kubectl get monitors
kubectl describe monitor example-monitor
```

### 결론

이 예제에서는 Kubebuilder를 사용하여 간단한 모니터링 오퍼레이터를 구현하였습니다. 이 오퍼레이터는 주어진 URL의 가용성을 체크하고, 그 결과를 Kubernetes CR의 상태로 반영합니다. 이를 통해 복잡한 모니터링 로직을 자동화하고, Kubernetes 리소스를 통해 손쉽게 모니터링 결과를 관리할 수 있습니다. 이 패턴을 확장하여 다양한 서비스의 모니터링 및 관리를 자동화할 수 있습니다.

## Go 언어 기초부터 고급까지

Go 언어(또는 Golang)는 구글에서 개발한 프로그래밍 언어로, 간결하고 효율적인 코드 작성이 가능하며 동시성을 쉽게 구현할 수 있는 특징이 있습니다. Go 언어는 성능, 간결성, 그리고 확장성을 목표로 설계되었습니다. 이 언어는 특히 서버 개발과 같은 시스템 프로그래밍에 적합하며, 널리 사용되고 있습니다.

### Go 언어 기본 예제

#### Hello World

Go 프로그램의 기본 구조와 `main` 함수, 그리고 `fmt` 패키지를 사용하여 간단한 출력을 하는 방법을 알아봅니다.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

- `package main`: 프로그램의 시작점이 되는 패키지를 정의합니다.
- `import "fmt"`: 표준 입출력을 담당하는 `fmt` 패키지를 가져옵니다.
- `func main()`: 프로그램의 진입점 함수로, 실행 시 가장 먼저 호출됩니다.
- `fmt.Println`: 문자열을 출력하는 함수입니다.

#### 변수와 상수

Go에서 변수를 선언하고 사용하는 방법을 설명합니다.

```go
package main

import "fmt"

func main() {
    var name string = "Alice" // 명시적 타입 선언
    age := 30                 // 타입 추론
    const PI = 3.14           // 상수 선언

    fmt.Printf("Name: %s, Age: %d
", name, age)
    fmt.Println("Value of PI:", PI)
}
```

- `var`: 변수를 선언할 때 사용하며, 명시적으로 타입을 지정하거나 타입 추론을 사용할 수 있습니다.
- `:=`: 변수 선언 및 초기화를 한 번에 하는 단축 구문으로, 타입을 추론합니다.
- `const`: 상수를 선언할 때 사용하며, 값이 변경되지 않습니다.
- `fmt.Printf`: 포맷 문자열을 사용하여 출력합니다.

#### 조건문과 반복문

Go에서 조건문과 반복문을 사용하는 방법을 설명합니다.

```go
package main

import "fmt"

func main() {
    number := 5

    // 조건문
    if number%2 == 0 {
        fmt.Println("Even number")
    } else {
        fmt.Println("Odd number")
    }

    // 반복문
    for i := 0; i < 5; i++ {
        fmt.Println("Iteration:", i)
    }

    // 무한 루프 (break로 탈출)
    sum := 0
    for {
        sum++
        if sum > 5 {
            break
        }
    }
    fmt.Println("Sum:", sum)
}
```

- `if`, `else`: 조건문을 사용하여 분기 처리를 합니다.
- `for`: 반복문을 사용하여 특정 작업을 반복 실행합니다.
- `break`: 반복문을 종료합니다.
