
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

#### 인터페이스

인터페이스를 사용하여 다형성을 구현하는 방법을 설명합니다.

```go
package main

import "fmt"

// 인터페이스 정의
type Shape interface {
    Area() float64
}

// 사각형 구조체 정의
type Rectangle struct {
    Width, Height float64
}

// 원 구조체 정의
type Circle struct {
    Radius float64
}

// Rectangle의 Area 메서드 구현
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

// Circle의 Area 메서드 구현
func (c Circle) Area() float64 {
    return 3.14 * c.Radius * c.Radius
}

func printArea(s Shape) {
    fmt.Printf("Area: %f
", s.Area())
}

func main() {
    rect := Rectangle{Width: 5, Height: 3}
    circle := Circle{Radius: 4}

    printArea(rect)
    printArea(circle)
}
```

- `interface`: 메서드의 집합으로 정의된 타입입니다. 여기서는 `Shape` 인터페이스가 정의되었습니다.
- `Shape` 인터페이스는 `Area` 메서드를 요구하며, 다양한 구조체에서 이를 구현할 수 있습니다.
- 인터페이스를 통해 다양한 타입에 대해 공통된 동작을 수행할 수 있습니다.

### 고급 예제

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

#### 고급 동시성 제어

`sync` 패키지를 사용하여 고급 동시성 제어를 구현하는 방법을 설명합니다.

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done() // 작업이 끝나면 WaitGroup의 카운터 감소
    fmt.Printf("Worker %d starting
", id)

    time.Sleep(time.Second)
    fmt.Printf("Worker %d done
", id)
}

func main() {
    var wg sync.WaitGroup // WaitGroup 생성

    for i := 1; i <= 5; i++ {
        wg.Add(1) // 각 고루틴 시작 시 WaitGroup의 카운터 증가
        go worker(i, &wg)
    }

    wg.Wait() // 모든 고루틴이 끝날 때까지 대기
    fmt.Println("All workers completed")
}
```

- `sync.WaitGroup`: 여러 고루틴의 완료를 기다릴 때 사용됩니다.
- `wg.Add(1)`: 새로운 고루틴을 시작할 때 카운터를 증가시킵니다.
- `wg.Done()`: 고루틴 작업이 완료되면 카운터를 감소시킵니다.
- `wg.Wait()`: 모든 고루틴이 완료될 때까지 대기합니다.

## 결론

Go 언어는 간결하고 효율적인 코드 작성이 가능한 언어로, 특히 동시성 프로그래밍에 강점을 가지고 있습니다. 위의 예제들은 Go 언어의 기본부터 고급 기능까지 다양한 측면을 다루며, 실제 프로젝트에 적용할 수 있는 기초를 제공합니다. 이를 기반으로 더 복잡한 프로그램을 작성할 수 있으며, Go의 다양한 라이브러리와 도구를 활용하여 강력한 어플리케이션을 개발할 수 있습니다.
