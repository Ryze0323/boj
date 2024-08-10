
# Kubebuilder 명령어: `init`와 `create api`

Kubebuilder는 Kubernetes 오퍼레이터를 개발할 때 프로젝트 초기화 및 API 생성을 쉽게 해주는 명령어를 제공합니다. `kubebuilder init`와 `kubebuilder create api` 명령어는 각각 프로젝트 설정과 리소스 생성에 사용되며, 다양한 옵션을 통해 커스터마이즈할 수 있습니다

## `kubebuilder init` 명령어

`kubebuilder init` 명령어는 새로운 Kubebuilder 프로젝트를 초기화하는 데 사용됩니다. 이 명령어는 프로젝트의 기본 구조와 설정을 생성하며, Go 모듈과 함께 필요한 파일 및 디렉토리를 만듭니다.

### 주요 옵션

- `--domain <string>`:
  - **기능**: 프로젝트에서 생성할 사용자 정의 리소스의 도메인을 지정합니다.
  - **목적**: 사용자 정의 리소스를 식별하는 데 사용되는 도메인 이름을 설정합니다. 일반적으로 조직의 도메인 이름을 반영합니다.
  - **예시**: `--domain example.com`은 리소스의 도메인을 `example.com`으로 설정합니다.

- `--repo <string>`:
  - **기능**: 프로젝트의 Go 모듈 경로를 지정합니다.
  - **목적**: 프로젝트가 GitHub과 같은 버전 관리 시스템에 호스팅될 경우 모듈 경로를 명확히 합니다. 이는 Go 모듈 시스템을 통해 종속성을 관리하는 데 사용됩니다.
  - **예시**: `--repo github.com/username/my-operator`는 프로젝트의 Go 모듈 경로를 `github.com/username/my-operator`로 설정합니다.

- `--project-name <string>`:
  - **기능**: 프로젝트의 이름을 지정합니다.
  - **목적**: 생성된 프로젝트 디렉토리의 이름을 지정합니다. 기본적으로는 현재 디렉토리 이름이 사용됩니다.
  - **예시**: `--project-name my-operator`는 프로젝트 이름을 `my-operator`로 설정합니다.

- `--license <string>`:
  - **기능**: 프로젝트의 라이선스 유형을 지정합니다.
  - **목적**: 프로젝트의 라이선스를 명시하여 소스 코드의 사용과 배포 조건을 설정합니다.
  - **예시**: `--license apache2`는 Apache 2.0 라이선스를 사용합니다.

- `--owner <string>`:
  - **기능**: 프로젝트의 소유자를 지정합니다.
  - **목적**: 생성되는 파일의 헤더에 소유자 정보를 포함합니다.
  - **예시**: `--owner "John Doe"`는 파일 헤더에 소유자를 "John Doe"로 지정합니다.

- `--component-config`:
  - **기능**: KubeBuilder의 매니저가 사용하는 설정 파일의 구성을 활성화합니다.
  - **목적**: 매니저 구성 파일을 통해 런타임 동작을 제어할 수 있습니다.

## `kubebuilder create api` 명령어

`kubebuilder create api` 명령어는 새로운 API 그룹, 버전, 그리고 리소스를 생성하는 데 사용됩니다. 이 명령어는 CRD와 컨트롤러 파일을 생성하여 사용자가 직접 리소스를 정의하고 관리할 수 있도록 합니다.

### 주요 옵션

- `--group <string>`:
  - **기능**: API 그룹 이름을 지정합니다.
  - **목적**: API 그룹은 여러 리소스를 논리적으로 묶어 관리하기 위한 이름 공간을 제공합니다.
  - **예시**: `--group webapp`은 API 그룹을 `webapp`으로 설정합니다.

- `--version <string>`:
  - **기능**: API 버전을 지정합니다.
  - **목적**: API 버전은 리소스의 버전 관리를 가능하게 하며, 지속적인 개선과 변경을 추적할 수 있습니다.
  - **예시**: `--version v1`은 API 버전을 `v1`으로 설정합니다.

- `--kind <string>`:
  - **기능**: 생성할 리소스의 종류(이름)를 지정합니다.
  - **목적**: 새로운 리소스의 이름을 정의하여 CRD 및 관련 파일을 생성합니다.
  - **예시**: `--kind Guestbook`은 리소스의 종류를 `Guestbook`으로 설정합니다.

- `--namespaced` / `--cluster-scoped`:
  - **기능**: 리소스의 스코프를 지정합니다.
  - **목적**: `--namespaced`는 리소스가 특정 네임스페이스에 속하게 하며, `--cluster-scoped`는 클러스터 전역에서 리소스를 사용할 수 있도록 합니다.
  - **예시**: `--namespaced`는 네임스페이스 범위 리소스를 생성합니다.

- `--resource`:
  - **기능**: 새로운 API와 함께 CRD 정의를 생성합니다.
  - **목적**: 리소스를 정의하는 YAML 파일을 자동으로 생성하여 API 서버에 등록할 수 있게 합니다.
  - **예시**: `--resource` 옵션을 사용하면 CRD가 자동으로 생성됩니다.

- `--controller`:
  - **기능**: 리소스를 관리하는 컨트롤러를 생성합니다.
  - **목적**: 새로운 리소스를 생성할 때 컨트롤러 파일을 자동으로 생성하여 리소스의 상태를 관리할 수 있도록 합니다.
  - **예시**: `--controller` 옵션을 사용하면 리소스를 관리하는 기본 컨트롤러가 생성됩니다.

- `--make=false`:
  - **기능**: 코드 생성 후 자동으로 `make` 명령어를 실행하지 않도록 합니다.
  - **목적**: 코드 생성 후 수동으로 작업을 조정하고 싶을 때 사용합니다.

### 요약

- **`kubebuilder init`**: 프로젝트의 기본 설정을 초기화하는 데 사용되며, Go 모듈과 함께 기본 파일 및 디렉토리를 생성합니다. 주로 도메인, 저장소 경로, 프로젝트 이름 등의 옵션을 설정합니다.
- **`kubebuilder create api`**: 사용자 정의 리소스와 이를 관리할 컨트롤러를 생성하는 데 사용됩니다. API 그룹, 버전, 리소스 종류를 설정하고, 리소스의 스코프를 지정합니다.

이 명령어들은 Kubernetes 오퍼레이터 개발을 시작하는 데 필수적인 구성 요소를 자동으로 생성하여 개발자들이 비즈니스 로직에 집중할 수 있도록 도와줍니다.