# Javascript 동작원리

javascript의 경우 싱글쓰레드 동작 언어임

> 싱글쓰레드

  하나의 프로세스에서 하나의 스레드를 실행하는 것으로 **한번에 하나의 작업만 수행할 수 있음**

but javascript의 특징에는 비동기, 동시성, 논블로킹 IO가 등장함.

이런 동시성을 어떻게 지닐 수 있고 많을 콜백함수를 사용할 수 있을까?

### Javascript 동작 원리

 ![img](C:\Users\user\Desktop\test\git\boj\image\javascript\image1.png)

- 런타임은 메모리 힙과 콜 스텍으로 구성됨
  - 메모리힙: 메모리 할당을 담당하는 곳
  - 콜스택: 코드가 호출되면서, 스택으로 쌓이는 곳