
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
