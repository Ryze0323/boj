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

### 중급 예제

#### 함수와 반환값

함수를 정의하고, 매개변수와 반환값을 사용하는 방법을 설명합니다.

```go
package main

import "fmt"

// 두 정수를 더하는 함수
func add(a int, b int) int {
    return a + b
}

// 다중 반환값을 갖는 함수
func divide(a int, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

func main() {
    result := add(3, 4)
    fmt.Println("Addition:", result)

    quotient, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Division:", quotient)
    }
}
```

- `func`: 함수를 정의할 때 사용합니다.
- 다중 반환값을 통해 에러 처리와 결과 값을 동시에 반환할 수 있습니다.
- `fmt.Errorf`: 에러를 생성할 때 사용합니다.

#### 구조체와 메서드

구조체를 정의하고, 해당 구조체에 메서드를 추가하는 방법을 설명합니다.

```go
package main

import "fmt"

// 구조체 정의
type Person struct {
    Name string
    Age  int
}

// 메서드 정의 (값 수신자)
func (p Person) Greet() {
    fmt.Printf("Hello, my name is %s and I am %d years old.
", p.Name, p.Age)
}

// 메서드 정의 (포인터 수신자)
func (p *Person) IncrementAge() {
    p.Age++
}

func main() {
    person := Person{Name: "Bob", Age: 25}
    person.Greet()

    person.IncrementAge()
    person.Greet()
}
```

- `type`: 새로운 타입을 정의할 때 사용합니다. 여기서는 `Person` 구조체를 정의합니다.
- 메서드는 함수와 비슷하지만, 특정 타입에 속합니다. 값 수신자와 포인터 수신자가 있습니다.
- `p Person`: 값 수신자로 메서드가 호출될 때 구조체의 복사본이 전달됩니다.
- `p *Person`: 포인터 수신자로 원본 구조체의 주소를 전달받아 수정할 수 있습니다.

#### 고루틴과 채널

Go의 고루틴(goroutine)을 사용하여 동시성을 구현하고, 채널(channel)을 사용하여 고루틴 간의 통신을 수행하는 방법을 설명합니다.

```go
package main

import (
    "fmt"
    "time"
)

// 메시지를 출력하는 고루틴
func printMessage(msg string, delay time.Duration, done chan bool) {
    time.Sleep(delay)
    fmt.Println(msg)
    done <- true // 작업 완료 신호 전송
}

func main() {
    done := make(chan bool, 2) // 채널 생성

    go printMessage("Hello from goroutine 1", 2*time.Second, done)
    go printMessage("Hello from goroutine 2", 1*time.Second, done)

    // 두 고루틴의 완료를 기다림
    <-done
    <-done

    fmt.Println("All goroutines completed")
}
```

- `go`: `go` 키워드를 사용하여 고루틴을 시작합니다.
- `channel`: 채널을 사용하여 고루틴 간에 데이터를 전달합니다.
- `time.Sleep`: 일정 시간 동안 고루틴을 지연시킵니다.
- `done <- true`: 채널을 통해 고루틴이 완료되었음을 신호합니다.
- `<-done`: 채널에서 데이터를 읽고, 고루틴이 완료될 때까지 대기합니다.

#### 패키지 및 모듈

Go에서 패키지를 작성하고 모듈로 관리하는 방법을 설명합니다.

##### 패키지 예제

먼저 패키지를 정의하고 사용할 수 있는 방법을 살펴보겠습니다.

```go
// calculator/calculator.go
package calculator

// 두 숫자의 합을 반환하는 함수
func Add(a int, b int) int {
    return a + b
}

// 두 숫자의 차를 반환하는 함수
func Subtract(a int, b int) int {
    return a - b
}
```

이 패키지를 사용하는 예제입니다.

```go
// main.go
package main

import (
    "fmt"
    "github.com/username/myapp/calculator" // 모듈 경로
)

func main() {
    sum := calculator.Add(3, 4)
    difference := calculator.Subtract(10, 3)

    fmt.Println("Sum:", sum)
    fmt.Println("Difference:", difference)
}
```

##### 모듈 초기화 및 관리

모듈을 초기화하고 패키지를 관리하는 방법을 설명합니다.

```bash
go mod init github.com/username/myapp
```

- `go mod init`: 새로운 모듈을 초기화합니다.
- `go.mod` 파일은 모듈의 이름과 종속성을 관리합니다.
