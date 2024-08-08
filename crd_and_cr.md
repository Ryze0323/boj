
# Custom Resource Definitions (CRD)와 Custom Resources (CR)

Kubernetes에서 Custom Resource Definition(CRD)와 Custom Resource(CR)는 Kubernetes 클러스터를 확장하고 맞춤화하는 강력한 도구입니다. 이를 통해 사용자는 Kubernetes의 기본 제공 리소스(예: Pod, Service 등) 외에 자신만의 리소스를 정의하고 관리할 수 있습니다. 아래에서는 CRD와 CR의 개념, 사용 사례 및 구현 방법에 대해 상세히 설명하겠습니다.

## Custom Resource Definition (CRD)

### CRD란?

- **CRD(Custom Resource Definition)**는 Kubernetes API를 확장하여 새로운 유형의 리소스를 정의하는 방법입니다.
- CRD를 사용하면 Kubernetes API 서버가 사용자 정의 리소스를 인식하고 관리할 수 있게 됩니다.

### CRD의 특징

- **확장성:** Kubernetes의 API를 확장하여 추가적인 리소스 타입을 정의할 수 있습니다.
- **표준화:** YAML/JSON 형식을 사용하여 리소스를 정의하며, Kubernetes의 기본 리소스와 동일한 방식으로 관리됩니다.
- **버전 관리:** 다양한 버전을 지원하여 리소스의 호환성을 유지할 수 있습니다.

### CRD의 구조

CRD는 주로 다음과 같은 필드로 구성됩니다:

- **`apiVersion:`** `apiextensions.k8s.io/v1`를 사용합니다.
- **`kind:`** `CustomResourceDefinition`으로 설정합니다.
- **`metadata:`** CRD의 이름 및 네임스페이스 등 메타데이터를 포함합니다.
- **`spec:`** 리소스의 이름, 버전, 스코프 및 OpenAPI v3 스키마를 정의합니다.

#### 예제

아래는 "Guestbook"이라는 리소스를 정의하는 간단한 CRD 예제입니다.

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: guestbooks.my.domain
spec:
  group: my.domain
  names:
    kind: Guestbook
    listKind: GuestbookList
    plural: guestbooks
    singular: guestbook
  scope: Namespaced
  versions:
  - name: v1
    served: true
    storage: true
    schema:
      openAPIV3Schema:
        type: object
        properties:
          spec:
            type: object
            properties:
              size:
                type: integer
                minimum: 1
```

### CRD의 사용 방법

1. **CRD 배포:**
   - YAML 파일로 작성한 CRD를 클러스터에 배포하여 Kubernetes API에 등록합니다.
   - `kubectl apply -f <crd.yaml>` 명령어로 배포합니다.

2. **CR 생성:**
   - CRD로 정의한 새로운 리소스 타입을 사용하여 Custom Resource(CR)를 생성할 수 있습니다.

## Custom Resource (CR)

### CR이란?

- **CR(Custom Resource)**는 CRD에 의해 정의된 사용자 정의 리소스의 실제 인스턴스입니다.
- CR은 Kubernetes 클러스터 내에서 리소스의 상태를 정의하고 관리하는 데 사용됩니다.

### CR의 특징

- **사용자 정의 데이터:** 사용자가 정의한 스키마에 따라 데이터를 포함할 수 있습니다.
- **API와 통합:** Kubernetes API와 통합되어 다른 Kubernetes 도구 및 리소스와 상호작용할 수 있습니다.
- **운영 자동화:** 컨트롤러 및 오퍼레이터와 함께 사용하여 리소스의 상태를 자동으로 관리할 수 있습니다.

### CR의 구조

CR은 일반적으로 다음과 같은 필드를 포함합니다:

- **`apiVersion:`** CRD에서 정의한 그룹 및 버전을 사용합니다.
- **`kind:`** CRD에서 정의한 리소스 종류를 사용합니다.
- **`metadata:`** 리소스의 이름, 네임스페이스 등 메타데이터를 포함합니다.
- **`spec:`** CR의 스펙을 정의하며, 원하는 상태를 기술합니다.
- **`status:`** (선택적) 리소스의 현재 상태를 기술합니다.

#### 예제

위에서 정의한 "Guestbook" CRD를 사용하는 CR의 예제입니다.

```yaml
apiVersion: my.domain/v1
kind: Guestbook
metadata:
  name: example-guestbook
spec:
  size: 3
```

### CR의 사용 방법

1. **CR 생성:**
   - CRD로 정의된 리소스를 기반으로 CR을 생성합니다.
   - `kubectl apply -f <cr.yaml>` 명령어로 CR을 클러스터에 생성합니다.

2. **CR 관리:**
   - `kubectl get <resource>` 명령어로 CR을 조회하고, `kubectl describe <resource>`로 상세 정보를 확인할 수 있습니다.
   - CR의 스펙을 수정하여 리소스의 원하는 상태를 변경할 수 있습니다.

### CRD와 CR의 관계

- **CRD는 API의 확장:** CRD는 Kubernetes API를 확장하여 새로운 리소스 타입을 정의합니다.
- **CR은 리소스의 인스턴스:** CR은 CRD에 의해 정의된 리소스 타입의 실제 인스턴스입니다.
- CRD는 API 서버에 의해 관리되며, CR은 이러한 API를 통해 생성, 조회, 수정 및 삭제됩니다.

## CRD와 CR의 활용 사례

### 실제 활용 사례

1. **데이터베이스 운영 자동화:**
   - CRD를 사용하여 데이터베이스 클러스터를 정의하고, CR을 통해 클러스터의 원하는 상태(예: 노드 수, 버전)를 관리할 수 있습니다.

2. **CI/CD 파이프라인 관리:**
   - CRD를 통해 배포 파이프라인을 정의하고, CR을 사용하여 각 배포 단계의 상태와 결과를 관리합니다.

3. **어플리케이션 설정 관리:**
   - CRD를 사용하여 어플리케이션 설정을 정의하고, CR을 통해 환경별 설정을 관리할 수 있습니다.

## 결론

Custom Resource Definition(CRD)와 Custom Resource(CR)는 Kubernetes 클러스터를 확장하고 맞춤화하는 핵심 요소입니다. 이를 통해 사용자는 복잡한 어플리케이션과 서비스를 효과적으로 관리하고 자동화할 수 있습니다. CRD를 통해 새로운 리소스 유형을 정의하고, CR을 사용하여 이러한 리소스를 인스턴스화함으로써 Kubernetes의 강력한 API를 활용할 수 있습니다. 이를 통해 운영의 복잡성을 줄이고, 일관성 있는 리소스 관리가 가능합니다.
