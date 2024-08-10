
# Kubebuilder

## 준비 사항

1. **Go 설치**: Kubebuilder는 Go 언어로 작성되므로 Go가 설치되어 있어야 합니다.
2. **Kubebuilder 설치**: Kubebuilder를 설치하여 오퍼레이터 프로젝트를 생성할 수 있도록 합니다.
3. **Kubernetes 클러스터**: Minikube나 Kind 같은 로컬 클러스터를 사용할 수 있습니다.

## 1. 프로젝트 초기화

먼저 Kubebuilder를 사용하여 새 프로젝트를 초기화합니다.

```bash
kubebuilder init --domain example.com --repo github.com/example/podwatcher
```

## 2. API 및 컨트롤러 생성

"PodWatcher"라는 새로운 리소스 타입을 생성합니다.

```bash
kubebuilder create api --group monitoring --version v1 --kind PodWatcher
```

위 명령을 실행하면 `api/v1/podwatcher_types.go`와 `controllers/podwatcher_controller.go` 파일이 생성됩니다.

## 3. Custom Resource 정의

`api/v1/podwatcher_types.go` 파일을 수정하여 PodWatcher  리소스의 스펙과 상태를 정의합니다.

```go
// PodWatcherSpec defines the desired state of PodWatcher
type PodWatcherSpec struct {
    // Namespace to watch for Pods
    Namespace string `json:"namespace,omitempty"`
}

// PodWatcherStatus defines the observed state of PodWatcher
type PodWatcherStatus struct {
    // ObservedPods contains the list of Pod names in the watched namespace
    ObservedPods []string `json:"observedPods,omitempty"`
}
```

## 4. 컨트롤러 구현

`controllers/podwatcher_controller.go` 파일을 수정하여 리컨실(Reconcile) 로직을 구현합니다. 이 로직에서는 특정 네임스페이스의 Pod를 감시합니다.

```go
func (r *PodWatcherReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    log := log.FromContext(ctx)

    // Fetch the PodWatcher instance
    var podWatcher monitoringv1.PodWatcher
    if err := r.Get(ctx, req.NamespacedName, &podWatcher); err != nil {
        log.Error(err, "unable to fetch PodWatcher")
        return ctrl.Result{}, client.IgnoreNotFound(err)
    }

    // List all Pods in the specified namespace
    var pods corev1.PodList
    if err := r.List(ctx, &pods, client.InNamespace(podWatcher.Spec.Namespace)); err != nil {
        log.Error(err, "unable to list Pods")
        return ctrl.Result{}, err
    }

    // Update the PodWatcher status with the observed Pods
    observedPodNames := make([]string, len(pods.Items))
    for i, pod := range pods.Items {
        observedPodNames[i] = pod.Name
    }
    podWatcher.Status.ObservedPods = observedPodNames

    // Update the status
    if err := r.Status().Update(ctx, &podWatcher); err != nil {
        log.Error(err, "unable to update PodWatcher status")
        return ctrl.Result{}, err
    }

    log.Info("reconciled PodWatcher", "namespace", podWatcher.Spec.Namespace, "pods", observedPodNames)
    return ctrl.Result{}, nil
}

func (r *PodWatcherReconciler) SetupWithManager(mgr ctrl.Manager) error {
    return ctrl.NewControllerManagedBy(mgr).
        For(&monitoringv1.PodWatcher{}).
        Owns(&corev1.Pod{}).
        Complete(r)
}
```

## 5. 매니페스트 수정

`config/samples/monitoring_v1_podwatcher.yaml` 파일을 수정하여 샘플 CR을 특정 네임스페이스를 감시하도록 설정합니다.

```yaml
apiVersion: monitoring.example.com/v1
kind: PodWatcher
metadata:
  name: example-podwatcher
spec:
  namespace: my-namespace
```

## 6.  CRD 설치 및 컨트롤러 배포

CRD를 클러스터에 설치하고 컨트롤러를 배포합니다.

```bash
make install
make run
```

## 7. 테스트

샘플 CR을 적용하고 PodWatcher가 지정된 네임스페이스의 Pod를 감시하는지 확인합니다.

```bash
kubectl apply -f config/samples/monitoring_v1_podwatcher.yaml
```

PodWatcher의 상태를 확인하여 감시된 Pod 목록을 볼 수 있습니다.
```bash
kubectl get podwatcher example-podwatcher -o yaml
```

## 8. monitor 될 Pod 매니페스트 작성
다음은 my-namespace 네임스페이스에 example-pod라는 Pod를 생성하는 매니페스트입니다.
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
  namespace: my-namespace
  labels:
    app: example
spec:
  containers:
  - name: example-container
    image: nginx:latest
    ports:
    - containerPort: 80

```
위에서 작성한 Pod 매니페스트를 사용하여 Pod를 생성합니다.
```bash
kubectl apply -f example-pod.yaml
```