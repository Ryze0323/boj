
# Kubebuilder와 Golang

## Kubebuilder로 간단한 모니터링 오퍼레이터 작성하기

### 준비 사항

1. **Go 설치**: Kubebuilder는 Go 언어로 작성되므로 Go가 설치되어 있어야 합니다.
2. **Kubebuilder 설치**: Kubebuilder를 설치하여 오퍼레이터 프로젝트를 생성할 수 있도록 합니다.
3. **Kubernetes 클러스터**: Minikube나 Kind 같은 로컬 클러스터를 사용할 수 있습니다.

### 1. 프로젝트 초기화

먼저 Kubebuilder를 사용하여 새 프로젝트를 초기화합니다.

```bash
kubebuilder init --domain example.com --repo github.com/username/monitor-operator
```

### 2. API 및 컨트롤러 생성

"Monitor"라는 새로운 리소스 타입을 생성합니다.

```bash
kubebuilder create api --group monitoring --version v1 --kind Monitor
```

위 명령을 실행하면 `api/v1/monitor_types.go`와 `controllers/monitor_controller.go` 파일이 생성됩니다.

### 3. Custom Resource 정의

`api/v1/monitor_types.go` 파일을 수정하여 Monitor 리소스의 스펙과 상태를 정의합니다.

```go
// MonitorSpec defines the desired state of Monitor
type MonitorSpec struct {
    URL string `json:"url"`  // 모니터링할 URL
}

// MonitorStatus defines the observed state of Monitor
type MonitorStatus struct {
    Available bool   `json:"available"` // 서비스 가용성 상태
    Message   string `json:"message"`   // 상태 메시지
}

// Monitor is the Schema for the monitors API
type Monitor struct {
    metav1.TypeMeta   `json:",inline"`
    metav1.ObjectMeta `json:"metadata,omitempty"`

    Spec   MonitorSpec   `json:"spec,omitempty"`
    Status MonitorStatus `json:"status,omitempty"`
}
```

### 4. 컨트롤러 구현

`controllers/monitor_controller.go` 파일을 수정하여 리컨실(Reconcile) 로직을 구현합니다. 이 로직에서는 HTTP GET 요청을 통해 지정된 URL의 상태를 체크합니다.

```go
package controllers

import (
    "context"
    "net/http"
    "time"

    "github.com/go-logr/logr"
    "k8s.io/apimachinery/pkg/api/errors"
    "k8s.io/apimachinery/pkg/runtime"
    ctrl "sigs.k8s.io/controller-runtime"
    "sigs.k8s.io/controller-runtime/pkg/client"

    monitoringv1 "github.com/username/monitor-operator/api/v1"
)

// MonitorReconciler reconciles a Monitor object
type MonitorReconciler struct {
    client.Client
    Log    logr.Logger
    Scheme *runtime.Scheme
}

// Reconcile monitors the specified URL and updates the status
func (r *MonitorReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    log := r.Log.WithValues("monitor", req.NamespacedName)

    // Fetch the Monitor instance
    var monitor monitoringv1.Monitor
    if err := r.Get(ctx, req.NamespacedName, &monitor); err != nil {
        if errors.IsNotFound(err) {
            // Object not found, return. Created objects are automatically garbage collected.
            // For additional cleanup logic use finalizers.
            return ctrl.Result{}, nil
        }
        // Error reading the object - requeue the request.
        return ctrl.Result{}, err
    }

    // Check the URL availability
    available, message := checkURL(monitor.Spec.URL)

    // Update the Monitor status
    monitor.Status.Available = available
    monitor.Status.Message = message

    if err := r.Status().Update(ctx, &monitor); err != nil {
        log.Error(err, "unable to update Monitor status")
        return ctrl.Result{}, err
    }

    return ctrl.Result{RequeueAfter: 30 * time.Second}, nil
}

// checkURL checks the availability of the given URL
func checkURL(url string) (bool, string) {
    resp, err := http.Get(url)
    if err != nil {
        return false, err.Error()
    }
    defer resp.Body.Close()

    if resp.StatusCode == http.StatusOK {
        return true, "URL is available"
    }
    return false, "URL is unavailable"
}

// SetupWithManager sets up the controller with the Manager.
func (r *MonitorReconciler) SetupWithManager(mgr ctrl.Manager) error {
    return ctrl.NewControllerManagedBy(mgr).
        For(&monitoringv1.Monitor{}).
        Complete(r)
}
```

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