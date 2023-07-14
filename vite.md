먼저, Vite에 대해 간단히 소개하겠습니다. Vite는 Evan You가 개발한 모던 웹 애플리케이션을 위한 빌드 툴 및 개발 서버입니다. Vite는 프랑스어로 "빠른"이란 뜻이며, 그 이름처럼 이 도구의 주요 특징은 그 빠른 속도입니다. Vite는 런타임에 바로 ES 모듈을 로드하고 브라우저에 빠르게 제공할 수 있습니다.

# Vite의 주요 특징들
 
 - 빠른 업데이트:
Vite는 자바스크립트 파일을 한 번에 하나씩 변환하기 때문에, 하나의 파일에 대한 변경은 그 파일만 다시 컴파일됩니다. 이렇게 하면 변경이 발생할 때마다 전체 애플리케이션을 다시 컴파일하지 않아도 되므로 개발 중인 빌드 속도가 크게 향상됩니다.

 - 빠른 의존성 전처리:
Vite는 처음 페이지 로딩 시 의존성을 미리 컴파일하고 캐시하므로, 의존성 로딩이 실제 애플리케이션 코드의 변경사항에 영향을 미치지 않습니다.

 - 모듈 핫 리플레이싱 (HMR):
Vite는 본래 ES 모듈을 지원하는 모던 브라우저에서 런타임에 직접 작동하도록 설계되었습니다. 이를 통해 Vite는 변경된 모듈만을 빠르게 업데이트할 수 있습니다. 이는 전통적인 HMR 구현보다 훨씬 더 빠르며 정확한 HMR을 제공합니다.

 - 풍부한 플러그인 시스템:
Vite는 Rollup 플러그인을 지원하므로, 더욱 넓은 범위의 웹 플랫폼 기능을 사용할 수 있습니다.

# Vite의 작동 원리
Vite는 두 가지 주요한 단계로 동작합니다: 개발 및 빌드

## 개발 모드(Development Mode)
- 개발 서버 실행: 개발 모드에서 Vite는 개발 서버를 실행하여 애플리케이션을 제공합니다. 개발 서버는 브라우저에 애플리케이션을 제공하고 파일 변경 사항을 실시간으로 감지하여 빠르게 업데이트합니다.

- ES 모듈 변환: Vite는 웹 브라우저에서 바로 실행될 수 있는 ES 모듈 형식으로 소스 코드를 변환합니다. 이를 통해 브라우저에서 모듈 로드 시에 별도의 번들링이 필요하지 않아 빠른 로딩 속도를 제공합니다.

- 빠른 의존성 전처리: Vite는 초기 페이지 로딩 시 필요한 의존성 모듈을 미리 로드하여 캐시합니다. 이를 통해 필요한 의존성 모듈의 로딩 속도를 크게 향상시킵니다.

- 모듈 핫 리플레이싱: 파일이 수정될 때, Vite는 변경된 파일만 다시 컴파일하고 브라우저에 즉시 업데이트합니다. 이를 통해 개발자는 브라우저를 새로 고치지 않고도 변경 사항을 실시간으로 확인할 수 있습니다.

## 빌드 모드(Build Mode)

- 번들링 및 최적화: 빌드 모드에서 Vite는 Rollup을 사용하여 애플리케이션을 번들링하고 최적화합니다. Rollup은 트리 쉐이킹과 같은 최적화 기능을 통해 번들 크기를 최소화하고 성능을 향상시킵니다.

- ES 모듈 변환: Vite는 빌드 과정에서 ES 모듈 형식으로 소스 코드를 변환합니다. 이를 통해 모던 브라우저에서 애플리케이션을 실행할 수 있으며, 브라우저 호환성 문제를 해결합니다.

- 코드 분할 (Code Splitting): Vite는 동적 임포트 문법을 사용하여 코드를 분할합니다. 이를 통해 필요한 코드만 필요한 시점에 로드하여 초기 로딩 속도를 개선하고 애플리케이션의 성능을 향상시킵니다.

- 압축 및 난독화: Vite는 빌드 과정에서 애플리케이션 코드를 압축하고 난독화하여 번들 크기를 최소화합니다. 이는 애플리케이션의 전송 속도를 향상시키고 보안을 강화합니다.

위의 과정을 예시를 통해 설명해보겠습니다. 예를 들어, Vue.js 프로젝트를 개발 중이라고 가정해봅시다. 개발 서버가 실행되고 App.vue 파일이 변경되었습니다.

- 개발 모드에서: Vite는 변경된 App.vue 파일만 다시 컴파일하고 브라우저에 업데이트합니다. 브라우저에서는 변경된 컴포넌트를 빠르게 확인할 수 있습니다.

- 빌드 모드에서: Vite는 Rollup을 사용하여 애플리케이션을 번들링합니다. Rollup은 트리 쉐이킹과 코드 분할 등의 최적화 기능을 적용하여 번들 크기를 최소화하고 성능을 향상시킵니다. 번들링된 애플리케이션은 압축 및 난독화되어 최종적인 빌드 결과물이 생성됩니다.

이와 같은 과정을 통해 Vite는 빠른 개발 환경과 효율적인 빌드 프로세스를 제공하여 개발자들에게 편리하고 효과적인 개발 경험을 제공합니다.

# Vite 프로젝트 시작하기
Vite를 설치하고 새 프로젝트를 생성하는 방법은 아래와 같습니다.

```bash
npm init vite@latest
```
위 명령어를 실행하면, 프로젝트 이름과 사용하고자 하는 프레임워크 (Vue, React, Preact, LitElement 또는 Vanilla JS)를 포함한 몇 가지 옵션을 선택하라는 프롬프트가 나타납니다.

선택 사항을 입력하면 Vite가 프로젝트를 생성하고 필요한 의존성을 설치합니다. 생성된 프로젝트에 들어가서 npm run dev 를 실행하면 Vite 개발 서버가 시작됩니다.

```bash
cd vite-project
npm run dev
```
이로써, Vite를 사용하여 빠른 개발 환경을 설정하고 시작할 수 있습니다.

# Vite CLI

## 프로젝트 생성
Vite CLI를 사용하여 새로운 Vite 프로젝트를 생성할 수 있습니다. 아래 명령어를 실행하여 새로운 Vite 프로젝트를 생성해봅시다.

```bash
npm init vite@latest my-vite-project
```
위 명령어를 실행하면 Vite CLI가 최신 버전의 Vite를 설치하고, 지정한 프로젝트 이름(my-vite-project)으로 새로운 디렉토리를 생성합니다.

## 개발 서버 실행
Vite 프로젝트를 개발하기 위해 개발 서버를 실행할 수 있습니다. Vite CLI에서 프로젝트 디렉토리로 이동한 후, 다음 명령어를 실행하여 개발 서버를 실행해봅시다.

```bash
cd my-vite-project
npm run dev
```
위 명령어를 실행하면 Vite 개발 서버가 시작되고, 애플리케이션은 기본적으로 http://localhost:3000 주소에서 실행됩니다.

## 빌드
Vite CLI를 사용하여 Vite 프로젝트를 빌드할 수 있습니다. 다음 명령어를 실행하여 프로젝트를 빌드해봅시다.

```bash
npm run build
```
위 명령어를 실행하면 Rollup을 사용하여 프로젝트가 번들링되고 최적화된 결과물이 생성됩니다. 번들링된 파일은 dist 디렉토리에 위치합니다.

# vite.config.js

vite.config.js는 Vite 프로젝트의 설정 파일로, Vite 개발 서버와 빌드 설정을 정의하는 곳입니다. 이 파일을 사용하여 프로젝트의 동작을 세부적으로 조정할 수 있습니다. 아래에서 vite.config.js 파일의 구조와 주요 요소들 입니다.
```javascript
// vite.config.js
export default {
  // 기본 설정 옵션
  server: {
    // 개발 서버 설정
  },
  build: {
    // 빌드 설정
  },
  plugins: [
    // 플러그인 설정
  ],
  // 기타 설정
}
```
- export default { ... }: vite.config.js 파일은 기본적으로 설정 객체를 내보내야 합니다. export default 키워드로 객체를 내보냅니다.

- server: 개발 서버 설정을 정의하는 객체입니다. 개발 서버의 호스트, 포트, 프록시, CORS 등과 관련된 옵션을 설정할 수 있습니다.

- build: 빌드 설정을 정의하는 객체입니다. 빌드 시점에서 번들링, 압축, 코드 분할, 경로 설정 등과 관련된 옵션을 설정할 수 있습니다.

- plugins: Vite 플러그인을 설정하는 배열입니다. 플러그인을 사용하여 프로젝트의 동작을 확장하거나 사용자 정의 태스크를 수행할 수 있습니다.

- 기타 설정: vite.config.js 파일은 개발자의 요구에 따라 필요한 경우 다른 설정을 추가할 수 있습니다. 예를 들어, 환경 변수, 전역 상수, 로그 레벨 등을 설정할 수 있습니다.

vite.config.js 파일을 사용하여 개발 서버와 빌드 설정을 조정함으로써 프로젝트의 동작을 원하는 대로 설정할 수 있습니다. 이 파일을 수정하여 Vite 프로젝트를 최적화하고 필요한 기능을 추가할 수 있습니다. 

## 개발 서버 설정

개발 서버 설정은 vite.config.js 파일의 server 객체 내에서 조정할 수 있습니다. 아래에서 Vite 개발 서버 설정의 주요 옵션을 상세히 설명해드리겠습니다.

```javascript
// vite.config.js
export default {
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    hmr: {
      overlay: true
    },
    cors: true
  },
  // ...
}
```
위의 예시에서 사용된 Vite 개발 서버 설정 옵션을 설명합니다:

- host: 개발 서버가 바인딩할 호스트 주소를 설정합니다. 기본값은 'localhost'입니다.

- port: 개발 서버의 포트 번호를 설정합니다. 기본값은 3000입니다.

- open: 개발 서버가 실행될 때 브라우저를 자동으로 열도록 설정합니다. 기본값은 true입니다.

- proxy: 개발 서버에서 API 요청을 프록시하는 설정입니다. 예시에서는 /api로 시작하는 모든 요청을 http://localhost:8080으로 프록시하도록 설정하였습니다. changeOrigin은 원본 서버의 Origin을 유지할지 여부를 설정하며, rewrite는 프록시 경로를 재작성하는 함수입니다.

- hmr: 핫 모듈 리플레이스먼트(HMR) 옵션을 설정합니다. 예시에서는 overlay: true로 설정하여 HMR 오버레이를 활성화합니다. 이는 HMR이 실패할 경우 브라우저에 오류 메시지를 표시하는 기능입니다.

- cors: 개발 서버에서 Cross-Origin Resource Sharing (CORS)를 활성화할지 여부를 설정합니다. 기본값은 true로 설정되어 CORS를 허용합니다.

### proxy

Vite의 개발 서버 설정 중 proxy 옵션은 프록시를 설정하여 개발 서버에서 API 요청을 전달하도록 도와줍니다. 아래에서 Vite의 proxy 옵션의 기본값과 상세한 설명을 제공하겠습니다.

```javascript
// vite.config.js
export default {
  server: {
    // ...
     proxy: {
        // ...
     },
  },
  // ...
}
```
기본적으로 proxy 옵션은 비어 있는 객체 {}로 설정됩니다. 따라서 프록시 설정을 적용하지 않은 상태에서는 API 요청이 개발 서버로 전달되지 않고, 원래의 경로로 전송됩니다.

프록시 설정을 구성하기 위해 proxy 객체 내에 경로 및 대상 URL을 지정합니다. 예시를 통해 프록시 설정 옵션을 설명하겠습니다.

```javascript
// vite.config.js
export default {
  server: {
    // ...
    proxy: {
        '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
        }
    },
  },
  // ...
}
```
위 예시에서 사용된 프록시 설정 옵션을 설명합니다:

- '/api': 프록시를 적용할 경로를 /api로 설정합니다. /api로 시작하는 요청이 프록시에 의해 처리됩니다.

- target: 프록시 요청이 전달될 대상 URL을 설정합니다. 예시에서는 http://localhost:3000으로 설정되어 개발 서버로 요청이 전달됩니다.

- changeOrigin: 요청 헤더의 Origin을 대상 서버의 URL로 변경할지 여부를 설정합니다. 기본값은 false이며, true로 설정하면 Origin 헤더가 대상 서버의 URL로 변경됩니다.

- rewrite: 프록시 경로를 재작성하는 함수를 제공합니다. 예시에서는 /api를 빈 문자열로 재작성하도록 설정했습니다. 따라서 /api로 시작하는 요청이 프록시에 전달될 때 /api 경로가 제거됩니다.

프록시 설정을 사용하면 개발 중에 API 요청을 프록시 서버를 통해 처리하고, 개발 서버에서 원격 서버로 요청을 전달할 수 있습니다

### hmr

Hot Module Replacement (HMR)은 개발 중인 애플리케이션의 변경 사항을 실시간으로 반영하여 개발자에게 빠른 피드백을 제공하는 기능입니다. Vite는 HMR을 내장하고 있으며, hmr 객체를 사용하여 관련 설정을 구성할 수 있습니다.

아래는 Vite의 HMR 동작 방식을 상세히 설명합니다:

1. 개발 서버 실행: Vite 개발 서버가 실행되면서 애플리케이션의 엔트리 포인트와 의존성 그래프를 분석합니다.

2. 모듈 감지 및 갱신: 개발 서버는 파일 시스템의 변경 사항을 감지하고 해당 파일을 수정한 경우 변경된 모듈을 식별합니다.

3. 모듈 교체: 변경된 모듈과 해당 모듈에 의존하는 다른 모듈이 동적으로 교체됩니다. 이때, 모듈의 교체는 애플리케이션의 상태 손실 없이 이루어집니다.

4. 모듈 적용: 모듈이 교체된 후, 브라우저는 새로운 모듈을 즉시 적용하여 변경 사항이 반영된 애플리케이션을 렌더링합니다.

5. 상태 유지: HMR은 모듈 교체 시 애플리케이션의 상태를 유지합니다. 예를 들어, 폼 입력의 값이 변경되거나 스크롤 위치가 변경된 경우에도 해당 상태는 유지됩니다.

6. 모듈 범위 업데이트: HMR은 모듈의 수정 내용에 따라 해당 모듈에 의존하는 다른 모듈도 업데이트할 수 있습니다. 이는 의존성 그래프의 일부에 변경 사항이 전파되는 것을 의미합니다.

7. 오류 처리: HMR은 모듈 교체 시 발생할 수 있는 오류를 처리합니다. 오류 발생 시 브라우저 콘솔에 오류 메시지가 표시되며, 변경 사항이 롤백되어 애플리케이션은 이전 상태로 유지됩니다.

아래는 Vite의 HMR 관련 설정 옵션의 기본값과 상세한 설명입니다:

```javascript
// vite.config.js
export default {
  server: {
    // ...
    hmr: {
      overlay: true,
      port: 24678,
      protocol: 'auto',
      timeout: 1000,
      host: undefined,
      clientPort: undefined,
      // ...
    },
  },
  // ...
}
```
- overlay: HMR 오버레이를 활성화할지 여부를 설정합니다. 기본값은 true입니다. 활성화된 경우, HMR 오류가 발생하면 브라우저에 오류 메시지를 표시합니다.

- port: HMR 서버의 포트 번호를 지정합니다. 개발 서버와 HMR 서버는 별도의 포트를 사용하여 통신합니다. 기본값은 24678입니다. 따라서 개발 서버가 3000번 포트를 사용한다면, HMR 서버는 24678번 포트를 사용하여 변경 사항을 전송합니다.

- protocol: HMR 서버의 프로토콜을 설정합니다. 기본값은 'auto'이며, 자동으로 http 또는 https 중 하나를 선택합니다.

- timeout: HMR 연결이 타임아웃되기까지의 대기 시간을 설정합니다. 기본값은 1000밀리초(1초)입니다.

- host: HMR 서버가 바인딩할 호스트 주소를 설정합니다. 기본값은 undefined이며, Vite 개발 서버의 호스트와 동일하게 설정됩니다.

- clientPort: 클라이언트 측 HMR 소켓 연결에 사용될 포트 번호를 설정합니다. 기본값은 undefined이며, 자동으로 선택됩니다.

Vite의 HMR 기능은 개발 중인 애플리케이션의 변경 사항을 빠르게 반영하여 실시간으로 개발 환경을 업데이트합니다. HMR 설정을 조정하여 개발 환경을 최적화하고 변경 사항을 즉시 확인할 수 있습니다.

## 빌드 설정

Vite에서 빌드 설정은 vite.config.js 파일의 build 객체 내에서 조정할 수 있습니다. 빌드 설정은 애플리케이션을 번들링하고 최적화하는 데 사용됩니다. 아래에서 Vite의 빌드 서버 설정의 주요 옵션을 상세히 설명해드리겠습니다.

```javascript
// vite.config.js
export default {
  build: {
    target: 'es2020',
    polyfillDynamicImport: false,
    outDir: 'dist',
    assetsDir: '',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    manifest: true,
    rollupOptions: {
      // Rollup 옵션 설정
    }
  },
  // ...
}
```
위의 예시에서 사용된 Vite 빌드 서버 설정 옵션을 설명합니다:

- target: 빌드된 코드의 대상 환경을 지정합니다. 예시에서는 ES2020을 대상으로 설정했습니다.

- polyfillDynamicImport: 동적 임포트를 위한 폴리필을 사용할지 여부를 설정합니다. 예시에서는 동적 임포트를 위한 폴리필 사용을 비활성화했습니다.

> polyfillDynamicImport 옵션은 Vite에서 동적 임포트(dynamic import)를 지원하기 위한 폴리필(polyfill)을 사용할지 여부를 설정하는 옵션입니다. 동적 임포트는 모듈을 필요로 할 때 동적으로 로드하는 기능으로, 필요한 시점에 모듈을 비동기적으로 가져올 수 있습니다.
> 
>  기본적으로 Vite는 네이티브 ES 모듈 시스템을 사용하여 동적 임포트를 지원합니다. 하지만 일부 브라우저에서는 네이티브 동적 임포트를 지원하지 않는 경우가 있습니다. 이러한 경우에 Vite는 polyfillDynamicImport 옵션을 통해 폴리필을 사용하여 동적 임포트를 지원할 수 있습니다.
>
> polyfillDynamicImport: true: polyfillDynamicImport 옵션을 true로 설정하면 Vite는 동적 임포트를 지원하기 위해 폴리필을 사용합니다. 이 옵션을 사용하면 동적 임포트를 지원하지 않는 브라우저에서도 동적 임포트를 사용할 수 있습니다.
>
> polyfillDynamicImport: false: polyfillDynamicImport 옵션을 false로 설정하면 Vite는 폴리필을 사용하지 않습니다. 이 경우 동적 임포트를 지원하지 않는 브라우저에서는 동적 임포트가 작동하지 않을 수 있습니다.
>
> 기본적으로 polyfillDynamicImport 옵션은 false로 설정되어 있습니다. Vite가 폴리필을 사용하지 않으면 동적 임포트가 지원되지 않는 브라우저에서는 에러가 발생할 수 있으므로 주의해야 합니다.

- outDir: 빌드 결과물의 출력 디렉토리를 설정합니다. 예시에서는 'dist'로 설정하여 dist 디렉토리에 빌드 결과물이 생성됩니다.

- assetsDir: 정적 자산 파일의 디렉토리를 설정합니다. 예시에서는 빈 문자열로 설정되어 루트 디렉토리에 자산 파일이 생성됩니다.

- assetsInlineLimit: 파일 크기가 이 값보다 작은 경우, 빌드된 파일에 인라인으로 포함됩니다. 기본값은 4096바이트(4KB)입니다.

- cssCodeSplit: CSS 코드를 청크로 분리할지 여부를 설정합니다. 기본값은 true로 설정되어 CSS 코드가 별도의 파일로 분리됩니다.

- manifest: 청크 매니페스트(Chunk Manifest)를 생성할지 여부를 설정합니다. 매니페스트는 청크 파일의 이름과 경로를 나타내는 파일입니다. 기본값은 true로 설정되어 매니페스트가 생성됩니다.

- rollupOptions: Rollup 번들러에 대한 추가적인 옵션을 설정합니다. 예시에서는 Rollup의 옵션을 설정하지 않았으며, 필요한 경우 사용자 정의 Rollup 설정을 제공할 수 있습니다.

빌드 서버 설정에서는 더 많은 옵션을 사용할 수 있으며, 코드 분할, 압축 설정, 소스맵 생성 등을 조정할 수 있습니다. 

## 청크 분할

Vite를 이용해 청크(chunk)를 생성하고 관리하는 방법에 대해 알아보겠습니다.

청크는 코드의 구성 요소로, 모듈 번들러가 번들(bundle)을 나누는 방식을 말합니다. 청크를 활용하면, 필요에 따라 코드를 불러오거나, 공통 라이브러리를 별도의 청크로 분리하여 캐시 최적화를 할 수 있습니다.

Vite에서 청크를 생성하고 관리하기 위해 build.rollupOptions.output.manualChunks를 사용할 수 있습니다. 이 설정은 청크 생성 로직을 제어할 수 있는데, Vite에서는 함수 형태로만 지원합니다. 이 함수는 모듈 ID(주로 파일 경로)를 인자로 받아, 그 모듈이 속해야 할 청크의 이름을 반환합니다.

Vite 2.8 이전에는 'index'와 'vendor'를 기준으로 청크를 분리했지만, 이 방식은 Single Page Application에는 잘 동작했지만 모든 경우에 적용하기에는 한계가 있었습니다.

Vite 2.9부터는 manualChunks 설정을 기본적으로 제공하지 않고, 사용자가 이를 함수 형태로 직접 정의해야 합니다. 필요에 따라 splitVendorChunkPlugin을 사용하여 청크를 분리할 수도 있습니다.

```javascript
// vite.config.js
import { splitVendorChunkPlugin } from 'vite'
export default defineConfig({
  plugins: [splitVendorChunkPlugin()]
})
```
위의 예제는 splitVendorChunkPlugin을 사용하여 청크를 분리하는 방법을 보여줍니다. 이 플러그인은 사용자 정의 로직이 필요한 경우에 대비하여 splitVendorChunk({ cache: SplitVendorChunkCache }) 팩토리 함수로도 제공됩니다. 이때, 빌드 감시 모드가 제대로 동작하려면 buildStart 훅에서 cache.reset()을 호출해야 합니다.

manualChunks 함수 형태를 이용한 청크 생성 로직의 예를 보여드리겠습니다.
먼저, 우리가 다음과 같은 파일 구조를 가진 프로젝트를 가지고 있다고 가정해봅시다.

```lua
project/
│
├── node_modules/
│   ├── lodash/
│   ├── moment/
│   └── 기타 등등...
│
└── src/
    ├── asset/
    ├── components/
    │   └── HelloWorld.vue
    ├── App.vue
    └── main.js 
```
app.js는 애플리케이션의 주요 코드를 담고 있고, common 디렉토리에는 애플리케이션 전반에 공통적으로 사용하는 코드가 있습니다. 또한 node_modules에는 외부 라이브러리인 lodash와 moment가 있습니다.

이 경우, manualChunks를 이용해 다음과 같이 청크를 분할할 수 있습니다.

```javascript
// vite.config.js
import { defineConfig,splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    splitVendorChunkPlugin()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          console.log(id)
          if (id.includes('lodash')) {
            // 외부 라이브러리를 'lodash' 청크에 묶음
            return 'lodash';
          } else if (id.includes('moment')) {
            // 외부 라이브러리를 'moment' 청크에 묶음
            return 'moment';
          } else if (id.includes('node_modules')) {
            // 외부 라이브러리나머지는 'modules' 청크에 묶음
            return 'modules'
          } else if (id.includes('HelloWorld')) {
            // 내부 코드를 'HelloWorld' 청크에 묶음
            return 'HelloWorld';
          } else {
            // 그 외의 코드를 'app' 청크에 묶음
            return 'app';
          }
        }
      }
    }
  }
})

```

이렇게 설정하면 빌드 결과로 'lodash', 'moment', 'HelloWorld', 'app'라는 이름의 네 개의 청크 파일이 생성됩니다. 각 청크에는 해당 조건에 맞는 모듈들이 묶여 있게 됩니다.

이 예시에서는 'node_modules' 폴더 내의 'lodash'모듈은 'lodash' 청크에, 'moment'모듈은 'moment' 청크에, 나머지 모듈을 'modules' 청크에 묶도록 설정했습니다. 'HelloWorld' 경로를 포함하는 모든 모듈을 'HelloWorld' 청크에, 그리고 그 외의 모든 내부 모듈을 'app' 청크에 묶도록 설정하였습니다. 이를 통해 번들 사이즈를 최적화하고, 공통 라이브러리를 별도의 청크로 분리하여 캐시 효율을 향상시킬 수 있습니다.

다만, 이 설정은 **함수 형태**로 사용해야 하며, 객체 형태로 사용하면 플러그인이 아무런 효과를 발휘하지 않는다는 점을 주의해야 합니다.

## .env

Vite에서 환경 변수(environment variables)를 설정하기 위해 .env 파일을 사용할 수 있습니다. .env 파일은 프로젝트의 루트 디렉토리에 생성하며, 환경 변수를 KEY=VALUE 형식으로 정의합니다. Vite는 이러한 환경 변수를 읽어서 애플리케이션에서 사용할 수 있도록 도와줍니다.

.env 파일을 사용하여 환경 변수를 설정하는 방법은 다음과 같습니다:

1. .env 파일 생성: 프로젝트의 루트 디렉토리에 .env 파일을 생성합니다.

2. 환경 변수 정의: .env 파일에 환경 변수를 정의합니다. 각 줄은 KEY=VALUE 형식으로 환경 변수를 정의합니다. 예를 들면:

```
VITE_API_URL=https://api.example.com
VITE_API_KEY=abc123
```

- 애플리케이션에서 사용: .env 파일에 정의된 환경 변수를 애플리케이션에서 사용할 수 있습니다. 예를 들면:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
```

위의 예시에서 import.meta.env 객체를 사용하여 .env 파일에 정의된 환경 변수를 가져옵니다. VITE_ 접두사가 있는 변수는 Vite에 의해 전역으로 노출되며, import.meta.env를 통해 접근할 수 있습니다.

- 빌드 시 변수 추출: Vite는 빌드 시에 .env 파일에 정의된 환경 변수를 추출하여 번들에 포함시킬 수 있습니다. .env 파일에 정의된 환경 변수는 import.meta.env를 통해 접근할 수 있으며, 빌드 시에 실제 값으로 대체됩니다.

.env 파일의 이름을 변경하거나 다른 환경에 대한 변수를 정의하려면 추가적인 파일을 생성하면 됩니다. 예를 들어 .env.production 파일은 프로덕션 환경에서 사용되는 환경 변수를 정의하는 데 사용할 수 있습니다. 이러한 파일은 Vite가 자동으로 인식하고 해당 환경에서 사용합니다.

환경 변수를 사용하여 애플리케이션을 구성할 때, .env 파일에 중요한 정보를 저장하는 경우 보안을 고려해야 합니다. 암호, API 키 등의 중요한 정보는 .env 파일에 포함하지 않고, 서버 측에서 제공되도록 해야 합니다.

Vite의 환경 변수 설정을 통해 애플리케이션을 다양한 환경에 대응하고 구성할 수 있습니다. .env 파일을 통해 간편하게 환경 변수를 정의하고, 애플리케이션에서 사용할 수 있습니다.